const PostCommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-500">No comments available</p>;
  }

  return (
    <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
      {comments.map((comment, index) => {
        const authorName = comment?.author?.name || "Unknown author";

        let commentText;
        if (typeof comment.comment === "string") {
          commentText = comment.comment;
        } else if (typeof comment.comment === "object") {
          commentText = JSON.stringify(comment.comment);
          console.warn(`Comment ${index} is an object:`, comment.comment);
        } else {
          commentText = "Invalid comment";
          console.warn(
            `Comment ${index} has an invalid type:`,
            typeof comment.comment
          );
        }

        return (
          <div key={index} className="flex items-center gap-3 pt-4">
            <img
              className="max-w-6 max-h-6 rounded-full"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
                comment?.author?.avatar
              }`}
              alt="avatar"
            />
            <div>
              <div className="flex gap-1 text-xs lg:text-sm">
                <span>{authorName}</span>
                <span>{commentText}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostCommentList;
