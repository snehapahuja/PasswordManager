import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef(); 
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async()=>{
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords);
      setpasswordArray(passwords);
     
      
    
  }

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icons/close_eye.png")) {
      ref.current.src = "icons/open_eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/close_eye.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async() => {
    const newPassword = { ...form, id: uuidv4() };
    const updatedPasswords = [...passwordArray, newPassword];

    setpasswordArray(updatedPasswords); // update state
    let res = await fetch("http://localhost:3000/" , {method:"POST",headers:{"Content-Type":
      "application/json"},body:JSON.stringify(newPassword)});
  
    // localStorage.setItem("passwords", JSON.stringify(updatedPasswords)); // store same thing
    setform({ site: "", username: "", password: "" });
  };

  const deletePassword = async(id) => {
    console.log("deleting pass with id",id);
    let c = confirm("Do you really want to delete this password?")
    if(c){
      setpasswordArray(passwordArray.filter(item=>item.id!==id))
      let res = await fetch("http://localhost:3000/" , {method:"DELETE",headers:{"Content-Type":
        "application/json"},body:JSON.stringify(...form,id)});
      // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }
  }

  const editPassword = (id) =>{
    setform(passwordArray.filter(i=>i.id===id)[0])
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  }
  

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
      <div className="p-3 md:p-0 md:myContainer mb-[-20]">
        <div className="logo font-bold text-2xl text-gray-700">
          <h1 className="text-4xl text-center font-bold">
            <span className="text-purple-600">&#123; </span>
            Passwords?
            <span className="text-purple-600"> Solved. &#125;</span>
          </h1>
        </div>
        <p className="text-lg text-center text-gray-500">
          No more forgetting no more resetting
        </p>

        <div className="flex flex-col p-4 text-gray-800 gap-8 items-center">
          <input
            className="rounded-full border border-purple-950 w-full p-4 py-1"
            type="text"
            placeholder="Enter website URL"
            name="site"
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              className="rounded-full border border-purple-950 w-full p-4 py-1"
              type="text"
              placeholder="Enter username"
              value={form.username}
              name="username"
              onChange={handleChange}
            />
            <div className="relative">
              <input
                ref={passwordRef}
                className="rounded-full border border-purple-950 w-full p-4 py-1"
                type="password"
                placeholder="Enter Password"
                value={form.password}
                name="password"
                onChange={handleChange}
              />
              <span
                className="absolute right-[4px] top-[2px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={38}
                  src="icons/open_eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center gap-2 items-center font-bold text-purple-700 bg-purple-200 hover:bg-purple-300 rounded-full px-4 py-2 w-fit mb-[-10]"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#4f1091,secondary:#a866ee"
            ></lord-icon>
            Save Password
          </button>
        </div>
      </div>

      <div className="passwords">
        {passwordArray.length === 0 && <div>No passwords to show</div>}
        {passwordArray.length != 0 && (
          <table className="table-auto w-full overflow:hidden rounded-md ">
            <thead className="bg-purple-200 text-gray-600">
              <tr>
                <th className="text-center w-12">SITE</th>
                <th className="text-center w-12">USERNAME</th>
                <th className="text-center w-12">PASSWORD</th>
                <th className="text-center w-12">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="items-center text-center justify-center w-32 ">
                      <a href={item.site} target="_blank">
                        {item.site}
                      </a>
                    </td>
                    <td className="items-center text-center justify-center w-32">
                      {item.username}
                    </td>
                    <td className="items-center justify-center text-center w-32">
                      {item.password}
                    </td>
                    <td className="items-center text-center justify-center w-32">
                      <span className="cursor-pointer mx-1" onClick={() =>{editPassword(item.id)}}>
                        <lord-icon
                          src="https://cdn.lordicon.com/exymduqj.json"
                          trigger="hover"
                          stroke="bold"
                          colors="primary:#121331,secondary:#a866ee"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                      <span className="cursor-pointer mx-1" onClick={() =>{deletePassword(item.id)}}>
                        <lord-icon
                          src="https://cdn.lordicon.com/jzinekkv.json"
                          trigger="hover"
                          stroke="bold"
                          colors="primary:#121331,secondary:#a866ee"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;
