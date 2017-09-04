var SpacebookApp = function() {
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

  var _findPostById = function(id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function(text) {
    var post = {
      text: text,
      id: currentId,
      comments: []

    }

    currentId += 1;

    posts.push(post);
  }

  var renderPosts = function() {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];
      console.log("This is a post " + posts[i]);
      var commentsContainer = '<div class="comments-container">' +
        '<input type="text" class="comment-name">' +
        '<button class="btn btn-primary add-comment">Post Comment</button> ' +
        '<div class="actual-comments"></div></div>'

      $posts.append('<div class="post" data-id=' + post.id + '>' +
        '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');

      renderComments(i);
    }
  }

  var removePost = function(currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var createComment = function(comment, index) {
    posts[index].comments.push({
      text: comment
    })
  }

  function renderComments(index) {
    //select the HTML container where the comments will append
    var $commentsContainer = $('.post').eq(index).find(".actual-comments");
    //empty last comments to prevent duplicates
    $commentsContainer.empty();
    //selecting the relevant post in array
    var post = posts[index] //{text: dfkjdf, id: 5, comments: []}
    for (var i = 0; i < post.comments.length; i++) {
      var deleteComment = '<button class="remove-comment">Remove Comment</button>';
      var commentsByPost = '<div class="comment">' + post.comments[i].text + deleteComment + '</div>';
      $commentsContainer.append('<div class="comments-by-post">' + commentsByPost + '</div>');
      // $('.comments-container').append(commentsByPost);
    }
  }

  var toggleComments = function(currentPost) {
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

// Events
$('.add-post').on('click', function() {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function() {
  app.removePost(this);
});

$('.posts').on('click', '.add-comment', function() {
  var comment = $(this).siblings('.comment-name').val();
  var postIndex = $(this).closest('.post').index();
  app.createComment(comment, postIndex);
  app.renderComments(postIndex);
});

$('.posts').on('click', '.show-comments', function() {
  app.toggleComments(this);
});