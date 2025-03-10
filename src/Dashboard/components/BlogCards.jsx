import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FroalaEditor from "react-froala-wysiwyg";
import DOMPurify from "dompurify";

const BlogCards = () => {
  const [error, setError] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);

  // ✅ Load blogs from localStorage
  const [blogs, setBlogs] = useState(() => {
    const storedBlogs = localStorage.getItem("blogs");
    return storedBlogs ? JSON.parse(storedBlogs) : [];
  });

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    content: "",
  });

  // ✅ Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result }); // Convert image to Base64
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Edit function
  const handleEdit = (blog) => {
    setEditingBlog(blog.id);
    setFormData({
      image: blog.image || "",
      title: blog.title,
      content: blog.content,
    });
  };

  // ✅ Delete function
  const handleDelete = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    toast.success("Blog deleted successfully!", { autoClose: 1000 });
  };

  // ✅ Save function
  const handleSave = () => {
    if (!formData.title || !formData.content || !formData.image) {
      toast.error("All fields, including the image file, are required.", {
        autoClose: 1000,
      });
      return;
    }

    const updatedBlogs = blogs.map((blog) =>
      blog.id === editingBlog
        ? {
            ...blog,
            title: formData.title,
            content: formData.content,
            image: formData.image, // Save image as Base64
          }
        : blog
    );

    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    toast.success("Blog updated successfully!", { autoClose: 1000 });
    setEditingBlog(null);
  };

  const handleCancel = () => {
    setEditingBlog(null);
  };

  return (
    <div className="p-8 bg-[#788673] min-h-[87.5vh]">
      <Link to="/dashboard/create-form" className="">
        <button className="relative min-w-[120px] px-4 py-3 text-white/70 rounded-md border border-white/10 bg-gradient-to-b from-[#47515c] to-[#0b151e] shadow-inner transition-all duration-1000 ease-[cubic-bezier(0.15,0.83,0.66,1)] hover:scale-110 hover:-translate-y-1 hover:text-white before:absolute before:w-[70%] before:h-px before:left-[15%] before:bottom-0 before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:opacity-20 hover:before:opacity-100 hover:cursor-pointer my-4">
          Create Blog
        </button>
      </Link>
      {error && <p className="text-red-500 text-center my-4">{error}</p>}

      {blogs.length === 0 ? (
        <p>No blogs available. Start creating one!</p>
      ) : (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <p className="text-gray-500 text-sm mb-2">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <div className="text-gray-600 mb-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        DOMPurify.sanitize(blog.content) // Remove HTML tags for safe display
                          .replace(/<[^>]+>/g, "") // Strip remaining HTML tags
                          .substring(0, 30) + "...", // Show only first 30 characters,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-[#0a2281] text-white px-4 py-2 rounded-md hover:cursor-pointer"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 hover:cursor-pointer"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Form Modal */}
      {editingBlog !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center py-8 overflow-hidden">
          <div className="bg-[#f3f4f6] w-full md:w-1/2 p-6 rounded-md shadow-lg max-h-screen h-[100%] overflow-y-auto">
            {error && <p className="text-red-500 text-center my-4">{error}</p>}

            {/* Image Upload Input */}
            <h2 className="text-lg font-semibold">Upload Image</h2>
            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 mt-2 rounded-md"
              onChange={handleImageChange}
            />

            {/* Image Preview */}
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-40 object-cover rounded mt-2"
              />
            )}

            {/* Blog Title Input */}
            <h2 className="text-lg font-semibold mt-4">Blog Title</h2>
            <input
              type="text"
              className="w-full border p-2 mt-1 rounded-md"
              placeholder="Blog Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            {/* Blog Content (Froala Editor) */}
            <h2 className="text-lg font-semibold mt-4">Blog Content</h2>
            <div className="border p-2 mt-1 rounded-md bg-white">
              <FroalaEditor
                model={formData.content}
                onModelChange={(content) =>
                  setFormData({ ...formData, content })
                }
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handleSave}
                className="bg-[#2563eb] hover:cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-700 text-white hover:cursor-pointer px-4 py-2 rounded-md hover:bg-gray-900 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCards;
