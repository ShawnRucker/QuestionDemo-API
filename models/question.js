const Sequelize = require('sequelize');

let questionsModel = function(sequelize) {
    
    // The Model is always needed
    const questions = sequelize.define('questions', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        questionText: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {

    });

    // Relationships
     questions.belongsTo(sequelize.models.questiongroups);
    
    return {
        model : function() {    
            return questions;
        },
        findByStringMatch : function(stringToMatch, percentageMatch) {
         // This was done using a pormise and not an async function to stay with the design standard
         // used by Sequelize
         return new Promise(function(resolve, reject) {
            let SQL =  `SELECT *, (SELECT "name" FROM "questiongroups" WHERE "id"="public"."questions"."questiongroupId") as "questionGroupName",
                               CAST(GREATEST(length(:stringToMatch), length("questionText")) -
                               levenshtein(:stringToMatch, lower("questionText")) as FLOAT) / CAST(GREATEST(length(:stringToMatch), length("questionText")) as FLOAT)* 100 AS "percentageMatch"
                        FROM "public".questions 
                        WHERE CAST(GREATEST(length(:stringToMatch), length("questionText")) -
                              levenshtein(:stringToMatch, lower("questionText")) as FLOAT) / CAST(GREATEST(length(:stringToMatch), length("questionText")) as FLOAT)* 100 >= :percentageToMatch`;

            sequelize
            .query(SQL, 
                { replacements: { stringToMatch: stringToMatch.toLowerCase(), 
                  percentageToMatch: percentageMatch }, 
                  type: sequelize.QueryTypes.SELECT })
            .then(questions => {
              resolve(questions);
            })
            .catch(err=>{
              reject(err);    
            });
        });
    }
    }  
}

module.exports = questionsModel;

