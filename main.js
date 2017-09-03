// ==========================================
// Anna's Code
// ==========================================

var posts = [];

function addPosts(text, id, comment){
	posts.push({
		text: text,
		id: id,
		// username: [],
		comment: []
	})
}


$('.add-post').click(function(){
	console.log("clicked");
	var id = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	var text = $('#post-name').val();
	addPosts(text, id);
	postPosts();
	// removeComment();
})

function postPosts(){
	$('.posts').empty();
	for(var i = 0; i < posts.length; i ++){
		var li = ('<li data-id="' + posts[i].id +'">' + posts[i].text + " ID: " + posts[i].id + '</li>');
		$('.posts').append(li);
		// $('li').attr("data-id", posts[i].id);
	}
	removeCommentButton();
	addCommentButton();
}

function removeCommentButton(){
	var $removeButton = $('<input type="button" class="remove-button" value="remove-button" />');
	$removeButton.appendTo($('li'));
}

function addCommentButton(){
	var $commentButton = $('<input type="button" class="add-comment" value="add-comment" />');
	$commentButton.appendTo($('li'));
}

function postCommentButton(){
	var $postCommentButton = $('<input type="button" class="post-comment" value="post-comment" />')
	$postCommentButton.appendTo($('form'));
}

$('body').on('click', '.remove-button', function(){
	var dataId = $(this).closest('li').data().id
	console.log(dataId)
		for(var i = 0; i < posts.length; i ++){
			if(dataId == posts[i].id){
			posts.splice(i, 1);
			$(this).closest('li').remove()
			console.log(posts);
		}
	}
})

//////////Shitty afterwards


$('body').on('click', '.add-comment', function(){
	var form = $('<form></form>');
	// var comment = $('<p></p>');
	form.append('<input type:"text" class="form-comment" placeholder="comment"/>')
	// comment.appendTo(form);
	// $(form).append($(comment))
	$(this).closest('li').append($(form));
	console.log("I was clicked to add");
	postCommentButton();
})

// $('body').on('click', ".post-comment", function(){
// 	console.log("clicked");
// 	var comment = $('.post-comment').val();
// 	addPosts(comment);
// 	// removeComment();
// })

$('body').on('click', ".post-comment", function(){
	console.log("I was clicked to post");
	var comment = $('#form-comment').val();
	//TODO:uniquely identify this comments post both in the HTML and in the array

	//TODO: add comment to the relevant post in the array

	//TODO: add comment to the relevant post in HTML


	var comment = $(this).prev().val();
		for(var i = 0; i < posts.length; i ++){
			var postComment = $('<p>' + comment + '</p>')
			$('form').append(postComment);
}
});






// }
//==========================================
//Amitay's Code
//==========================================

// var posts = [];
// var id = 0;

// function addPost (text) {
//     var newPost = {
//     text: text, 
//     id: id
//     }
//     posts.push(newPost);
// };

// function addPostDiv (){
// 	var newPost =  $('#post-name').val();
// 	addPost(newPost);
// 	$(".posts").append('<p class="post" data-id='+id+'><button type="button" class="remove">REMOVE</button>' + newPost + '</p>');
// 	$('.remove').off()
// }

// // $('body').on('click', ".remove", function(){
// //   var j = $(this).closest('p').data().id  
// //   for(var i = 0; i < posts.length; i++);
// //   if(j === id){
// //       posts.splice(i, 1);
// //   }
// // })

// $('button').click(function(){
// console.log("I am being clicked");
// addPostDiv();
// });

