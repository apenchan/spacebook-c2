var SpacebookApp = function () {
  var posts = [
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]}
  ];

  // the current id to assign to a post
  var currentId = 0;
  var $posts = $('.posts');
  // var comment = [];

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments: []
  
    }

    currentId += 1;

    posts.push(post);
  }

  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];
      console.log("This is a post " + posts[i]);
      var commentsContainer = '<div class="comments-container">' +
      '<input type="text" class="comment-name">' +
      '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

      $posts.append('<div class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');
    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var createComment = function(comment, index){  
    posts[index].comments.push({
      text: comment
    })
  }

    var renderComments = function(){
    for(var i = 0; i < posts.length; i ++){
      for(var j = 0; j < posts[i].comments.length; j++){
        var commentsByPost = '<div class="comment-by-post">' + posts[i].comments[j].text + '</div>'
        $('.comments-container').append(commentsByPost);
      }
    }
  }

  // var renderComments = function(currentContainer){
  //   for(var i = 0; i < posts.length; i ++){
  //     // $('.comments-container').empty();
  //     // var $clickedPost = $(currentPost).closest('.post');
  //     console.log("Hello");
  //     var comment = $('.comment-name').val();
  //     // var comment = posts[i].comment;
  //     var commentsByPost = '<div class="comment-by-post">' + comment + '</div>'
  //     $('.comments-container').append(commentsByPost);
  //     // var $commentsContainer = $(currentContainer).closest('.comments-container'); 
  //     // $commentsContainer.append(commentsByPost);
  //   }
  // }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,

    // TODO: Implement
    createComment: createComment,

    // TODO: Implement
    renderComments: renderComments,

    // TODO: Implement
    // removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();
app.renderComments();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();
  
  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click', '.add-comment', function(){
  var comment = $(this).siblings('.comment-name').val();
  var postIndex = $(this).closest('.post').index();
  app.createComment(comment, postIndex);
  app.renderComments();
});

$('.posts').on('click','.show-comments', function () {
  app.toggleComments(this);
});
