import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import PasswordRow from "./PasswordRow";
import ConfirmModal from "./ConfirmModal";

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const ref = useRef();
  const show = useRef();
  const [data, setdata] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const getData = async () => {
    try {
      let res = await fetch("http://localhost:3000/");
      if (!res.ok) throw new Error("Failed to fetch data");
      let fetchData = await res.json();
      setdata(fetchData);
    } catch (err) {
      toast("Failed to fetch data!", { type: "error" });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const copytext = (text) => {
    toast("Copy to ClipBoard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
    console.log(text);
  };
  const showpassword = (e) => {
    console.log(e.target.src);

    if (ref.current.src.includes("icons/eyecross.png")) {
      show.current.type = "text";
      ref.current.src = "/icons/eye.png";
    } else {
      ref.current.src = "/icons/eyecross.png";
      show.current.type = "password";
    }
    console.log(e.target.src);
  };
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
    // console.log(form);
  };
  const savePassword = async () => {
    // console.log(form);
    let IsUpdated=false;
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      if(form.id){
        IsUpdated=true
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id }),
        });
        // setdata(data.filter((item) => item.id !== form.id));
        // console.log(form.id);
      }
      let newId=uuidv4()
      setdata([...data, { ...form,id:newId }]);
      
      // console.log(data);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: newId }),
      });
      // console.log([...data, { ...form, id: uuidv4() }]);
      // console.log(form.id);
      setform({ site: "", username: "", password: "" });
     if(IsUpdated){
      toast("Password Updated successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true, 
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     }else{
      toast("Password saved!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     }
    } else {
      toast("Password not saved!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleDeleteRequest = (id) => {
    setPendingDeleteId(id);
    setModalOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (pendingDeleteId) {
      await deletePassword(pendingDeleteId, true);
      setPendingDeleteId(null);
      setModalOpen(false);
    }
  };
  const handleCancelDelete = () => {
    setPendingDeleteId(null);
    setModalOpen(false);
  };
  const deletePassword = async (id, skipConfirm) => {
    if (!skipConfirm) return handleDeleteRequest(id);
    let c = confirm("Realy Wants to Delete");
    console.log("delete", id);
    if (c) {
      let newdata = data.filter((item) => {
        return id !== item.id;
      });
      setdata(newdata);
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast("Deleted successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const editPassword = async (id) => {
    setform({ ...data.filter((i) => i.id === id)[0],id:id});
    setdata(data.filter((item) => id !== item.id));
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="myContainer md:px-10 py-4 my-4 px-2 max-w-5xl mb-10">
        <div className="logo font-bold text-black text-4xl text-center">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">Mg&gt;</span>
        </div>
        <p className="text-center font-semibold text-slate-800 py-2">
          Manage your password Here!
        </p>
        <div className="flex flex-col py-3 md:px-0 px-5 items-center">
          <input
            type="text"
            name="site"
            value={form.site}
            onChange={handlechange}
            placeholder="Enter Website URL"
            className="p-3 py-1.5 w-full border border-green-500 focus:outline-none  rounded-full placeholder:text-lg my-3"
          />
          <div className="flex md:flex-row flex-col gap-3 w-full ">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handlechange}
              placeholder="Enter Username"
              className="w-full focus:outline-none border border-green-500 rounded-full px-4 my-3 py-1.5"
            />
            <div className="relative">
              <input
                type="password"
                name="password"
                ref={show}
                value={form.password}
                onChange={handlechange}
                placeholder="Enter Password"
                className="w-full focus:outline-none border border-green-500 rounded-full px-4 pr-9 py-1.5 md:my-3 mb-3"
              />
              <span
                className=" absolute right-3 md:top-5 top-2 cursor-pointer"
                onClick={(e) => showpassword(e)}
              >
                <img ref={ref} width={24} src="/icons/eyecross.png" alt="" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex items-center justify-center w-fit bg-green-400 hover:bg-green-300 rounded-full px-6 py-1.5 gap-2 mt-2 border border-green-900 "
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="alldata w-full">
          <h2 className="text-2xl font-semibold md:py-3 px-2 ">
            All Passwords
          </h2>
          <div className="mb-4 flex justify-end">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by site or username..."
              className="border border-green-400 rounded-full px-4 py-1 focus:outline-none w-full md:w-1/3"
            />
          </div>
          <div>
            {data.length === 0 && (
              <div className="w-full text-center pt-10">
                No Password to show
              </div>
            )}
            {data.length !== 0 && (
              <table className="w-full rounded-md overflow-hidden mt-2">
                <thead className="bg-green-500 text-white ">
                  <tr className="head">
                    <th className="p-2">Site</th>
                    <th className="p-2">Username</th>
                    <th className="p-2">Password</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-green-200">
                  {data
                    .filter(item =>
                      item.site.toLowerCase().includes(search.toLowerCase()) ||
                      item.username.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((item, index) => (
                      <PasswordRow
                        key={item.id || index}
                        item={item}
                        onCopy={copytext}
                        onEdit={editPassword}
                        onDelete={deletePassword}
                      />
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={modalOpen}
        message="Are you sure you want to delete this password?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default Manager;
