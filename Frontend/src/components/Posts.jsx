import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PostsApi from "../componentApi/postsApi";
const Posts = () => {
  return (
    <div className="m-5 mt-8">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Items Posted</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PostsApi.map((post, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded shadow flex items-center space-x-4 transition hover:scale-105 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-400"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-16 h-16 rounded"
            />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800">{post.title}</h2>
              <p className="text-sm text-gray-600">{post.description}</p>
            </div>
            <div className="flex space-x-2">
              <EditIcon className="cursor-pointer text-yellow-500" />
              <DeleteIcon className="cursor-pointer text-red-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
