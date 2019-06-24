const Config = require('./config/config');
const Sequelize = require('sequelize');
const Express = require('express')
const cors = require('cors');
const dbModel = require('./models/model_builder')
const app = Express()
app.use(cors());
const Op = Sequelize.Op;
const port = 3030

// Setup Sequelize for database access
// TODO: Make environment agnostic
const database = new dbModel(`postgres://${Config.development.username}:${Config.development.password}@${Config.development.host}:5432/${Config.development.database}`);
database.connectToDB();
     
// Setup Express for API Interface
// Capture Errors
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('General Failure!')
})

function setGeneralHeader(res) {
  res.setHeader('content','application/json');
}

//----------------------------------------------------------------------------------------------------
// Get Question In Page Format (UTILITY FUNCTION)
// ===============================
// Returns an object containing the Questions and their associated group broken down into page 
// segments
//
// INPUT PARAMETERS
// ================
//    pageNumber : Positive Integer designating the page number to load
//    pageSize   : How many questions to return with each page request
//----------------------------------------------------------------------------------------------------
async function getQuestionInPageFormat(pageNumber, pageSize) {
    
    let offset = (((pageNumber-1) * pageSize) + 1);
  
    // Get the page count and totals information
    let pgInfo = await database.questions.model().findAll({
        attributes: [[database.sequelize.fn('COUNT', database.sequelize.col('id')), 'num_questions']],
        });
    // Get the actual questions for the given page
    let questions = await database.questions.model().findAll({
      offset: offset, 
      limit: pageSize,
      order: [
          [database.questionGroups.model(), 'name', 'ASC'],
          ['questionText', 'ASC']
      ],
      include: [{
          model: database.questionGroups.model()
      }]});

    let response = { 
      pagingInformation : {
        totalQuestions: parseInt(pgInfo[0].dataValues.num_questions) ,
        currentPage: parseInt(pageNumber),
        totalPages: Math.ceil(pgInfo[0].dataValues.num_questions / pageSize),
        pageSize: parseInt(pageSize)
      }, 
      questions: questions 
    };
    
    return response;
}

//----------------------------------------------------------------------------------------------------
// GET => Get Question(s)
// ============================
// Returns an object containing the Questions and their associated group broken down into page 
// segments
//
// INPUT PARAMETERS
// ================
//    page      : Positive Integer designating the page number to load 
//              : OPTIONAL / DEFAULTS TO 1  
//
//    pagesize  : How many questions to return with each page request
//              : OPTIONAL / DEFAULTS TO 50
//----------------------------------------------------------------------------------------------------
app.get('/questions', (req, res) => {
  // Because of its size this method is designed to make it impossible to get all the questions at once
  let page = !req.query.page ? 1 : req.query.page;
  let pageSize = !req.query.pagesize ? 50:req.query.pagesize;
  
  getQuestionInPageFormat(page,pageSize)

  .then(result=>{
      setGeneralHeader(res);
      res.status(200).send(result);
  });
})

//----------------------------------------------------------------------------------------------------
// GET => Matching Question(s)
// ============================
// Returns an object containing the Questions that match the provided string based on the provided
// percentage match
//
// INPUT PARAMETERS
// ================
//    pageNumber : Positive Integer designating the page number to load
//               : REQUIRED / NO DEFAULT
//
//    pageSize   : How many questions to return with each page request
//               : REQUIRED / NO DEFAULT
//----------------------------------------------------------------------------------------------------
app.get('/matching_questions', (req, res) => { 
    
    // Were both of the required parameters passed in
    if (!req.query.questiontomatch || req.query.questiontomatch == 'undefined'){
        res.status(400).send("Missing required parameter [questiontomatch].");
        return
    }
    if (!req.query.percentagetomatch){
      setGeneralHeader(res);  
      res.status(400).send("Missing required parameter [percentagetomatch]");
        return
    }

    // TODO: If this was a full application there would need to be additonal
    //       error correction here to verify that a number was passed in for 
    //       the percentage and that the search string was not too long.

    let searchString = req.query.questiontomatch;
    let percentageToMatch = parseInt(req.query.percentagetomatch);

    database.questions.findByStringMatch(searchString,percentageToMatch)
    .then(questions=>{
        res.status(200).send(questions)
    }).catch(err=>{
        console.log(err.stack);
        res.status(500).send('Error encounterd while processing request')
    })

})  

// Start the API Engine
app.listen(port, () => console.log(`Example Queston Application API listening on port ${port}!`))




