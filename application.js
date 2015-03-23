var frontEndModule = (function() {

  // Get all Questions
  var questionId;

  var renderQuestions = function(questions) {
    var html = $('#questions-template').html();
    var templatingFunction = Handlebars.compile(html);
    $('.question-container').append(templatingFunction({ questions: questions, }));
  };

  var getQuestions = function(callback) {
    $.ajax({
      type:'GET',
      url:'http://localhost:3000/questions',
      success: function(questions) {
        callback(questions);
      }
    })
  };

  var clearForm = function() {
    $('#title').val('');
    $('#content').val('');
  };

  // New Question Stuff

  var renderNewQuestion = function(question) {
    var html = $('#question-template').html();
    var templatingFunction = Handlebars.compile(html);
    $('.question-container').append(templatingFunction({ question: question, }));
  };

  var submitQuestion = function(callback) {
    $.ajax({
      url:'http://localhost:3000/questions',
      type:'POST',
      data: $("form").serialize(),
      success: function(question) {
        callback(question);
      },
      error: function(){
        alert("NOTHING SAVED!");
      }
    })
  };

  var submitQuestionEvent = function() {
    $('form').on('submit', function(event) {
      event.preventDefault();
      submitQuestion(renderNewQuestion);
      clearForm();
    });
  };

  // Delete Stuff : Not tested

  var deleteQuestion = function(id) {
    $.ajax({
      url:'http://localhost:3000/questions/' + id,
      // dataType: 'text',
      // crossDomain: true,
      // data: null,
      type: 'DELETE',
      success: function() {
        console.log('DELETED')
      },
      // xhrFields: {
    // withCredentials: true
  // },
    });
  };

  var deleteEvent = function() {
    $('.question-container').on('click', 'button',function(event) {
      event.preventDefault();
      questionId = $(this).data('id');
      deleteQuestion(questionId);
    })
  };

  var init = function() {
    getQuestions(renderQuestions);
    submitQuestionEvent();
    deleteEvent();
  };

    return {
      init:init,
    };

})();

frontEndModule.init();
