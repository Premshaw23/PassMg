import React, { useState } from "react";

const PasswordRow = ({ item, onCopy, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <tr>
      <td className="text-center md:p-2">
        <div className="flex justify-center items-center gap-2">
          <a
            className="hover:font-bold "
            target="_blank"
            href={item.site}
            rel="noopener noreferrer"
          >
            {item.site}
          </a>
          <div
            className="copy cursor-pointer "
            onClick={() => onCopy(item.site)}
            title="Copy site URL"
          >
            <lord-icon
              style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
              src="https://cdn.lordicon.com/iykgtsbt.json"
              trigger="hover"
            ></lord-icon>
          </div>
        </div>
      </td>
      <td className="p-2 flex justify-center items-center gap-2">
        <div className="flex justify-center items-center gap-2">
          {item.username}
          <div
            className="copy cursor-pointer"
            onClick={() => onCopy(item.username)}
            title="Copy username"
          >
            <lord-icon
              style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
              src="https://cdn.lordicon.com/iykgtsbt.json"
              trigger="hover"
            ></lord-icon>
          </div>
        </div>
      </td>
      <td className="text-center p-2">
        <div className="flex justify-center items-center gap-2">
          <span>{showPassword ? item.password : "*".repeat(item.password.length)}</span>
          <button
            className="ml-2"
            onClick={() => setShowPassword((prev) => !prev)}
            title={showPassword ? "Hide password" : "Show password"}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <img
              width={22}
              src={showPassword ? "/icons/eye.png" : "/icons/eyecross.png"}
              alt={showPassword ? "Hide" : "Show"}
            />
          </button>
          <div
            className="copy cursor-pointer"
            onClick={() => onCopy(item.password)}
            title="Copy password"
          >
            <lord-icon
              style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
              src="https://cdn.lordicon.com/iykgtsbt.json"
              trigger="hover"
            ></lord-icon>
          </div>
        </div>
      </td>
      <td className="justify-center py-2 text-center">
        <span
          className="cursor-pointer mx-1"
          onClick={() => onEdit(item.id)}
          title="Edit"
        >
          <lord-icon
            src="https://cdn.lordicon.com/gwlusjdu.json"
            trigger="hover"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
        </span>
        <span
          className="cursor-pointer mx-1"
          onClick={() => onDelete(item.id)}
          title="Delete"
        >
          <lord-icon
            src="https://cdn.lordicon.com/skkahier.json"
            trigger="hover"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
        </span>
      </td>
    </tr>
  );
};

export default PasswordRow; 