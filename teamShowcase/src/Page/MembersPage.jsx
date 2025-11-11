import { useEffect, useState } from "react";
import NavbarTeams from "../Components/NavbarTeams";
import notification from "../assets/Logo/Notification.svg";
import axios from "axios";
import userImg from "../assets/person/userImg.svg";
import OpenAdd from "../Components/openAdd";
import { useFormState } from "react-dom";
import edit from "../assets/person/Edit.svg";
import del from "../assets/person/delete.svg";

const MembersPage = () => {
  const [users, setUsers] = useState();
  const baseURL = "https://devplat.heraldcollege.edu.np/hiring/api";
  const [openAdd, setOpenAdd] = useState(false);
  const [openOverlay, setOpenOverlay] = useState(false);
  const [updateUser, setupdateUser] = useState(false);
  useEffect(() => {
    axios
      .get(`${baseURL}/members`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [updateUser]);

  useEffect(() => {
    console.log(users);
    if (users) {
      {
        users.map((details) => console.log(users));
      }
    }
  }, [users]);

  const editUser = (id) => {
    axios
      .put(`${baseURL}/members,${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const deleteUser = (id) => {
    console.log(id);
    axios
      .delete(`${baseURL}/members/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setupdateUser(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (openAdd) {
      const payload = {
        username: "Sasjonny jonnyika",
        email: "jonny@example.com",
        photo: "photo",
        department: "HR",
        role: "admin",
      };
      console.log(payload);
      axios
        .post(`${baseURL}/members`, payload)
        .then((response) => {
          console.log(response.data);
          setupdateUser(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [openAdd]);

  return (
    <>
      <div className="main-screen flex flex-row h-screen w-screen ">
        <div className="nav bg-[#FAFAFA]  w-[350px] h-full "></div>
        <div className="main-components flex flex-col gap-10 p-6 pr-32 w-full">
          <div className="noti-bar border-2 border-black w-full h-14 flex flex-row  justify-end p-2">
            <img src={notification} alt="" />
          </div>
          <div className="team-bar border-2 border-black h-[50%] flex flex-col gap-4">
            <div className="header flex flex-row justify-between">
              <p className="text-[28px] font-semibold">Teams</p>
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => {
                    setOpenAdd(true);
                  }}
                  className="bg-[#5D9936] text-white  rounded-xl py-[8px] px-[12px] cursor-pointer"
                >
                  add user
                </button>
                <input
                  type="text"
                  className="border-2 rounded-2xl border-black"
                />
              </div>
            </div>

            <div className="options flex flex-row gap-2">
              <p className="text-sm rounded-full py-[7px] px-[15px] border-2 border-[#D4D4D4] ">
                All
              </p>
              <p className="text-sm rounded-full py-[7px] px-[15px] border-2 border-[#D4D4D4] ">
                R&D
              </p>
              <p className="text-sm rounded-full py-[7px] px-[15px] border-2 border-[#D4D4D4] ">
                Research
              </p>
              <p className="text-sm rounded-full py-[7px] px-[15px] border-2 border-[#D4D4D4] ">
                SSD
              </p>
              <p className="text-sm rounded-full py-[7px] px-[15px] border-2 border-[#D4D4D4] ">
                Finance
              </p>
              <p className="text-sm rounded-full py-[7px] px-[15px] border-2 border-[#D4D4D4] ">
                Research
              </p>
            </div>

            <table className="w-full border-collapse ">
              <thead>
                <tr className="text-center border-b border-[#D4D4D4] ">
                  <th className="font-normal">Name</th>
                  <th className="font-normal">Department</th>
                  <th className="font-normal">Role</th>
                  <th className="font-normal">edit</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((details, index) => (
                    <tr key={details._id} className="text-center">
                      <td className="p-3 flex flex-row gap-4 items-center">
                        <img src={userImg} alt="" />
                        <div className="flex flex-col items-start">
                          <p className="text-lg font-semibold ">
                            {details.username}
                          </p>
                          <p className="text-sm font-normal">{details.email}</p>
                        </div>
                      </td>
                      <td className="p-3 items-start">{details.department}</td>
                      <td className="p-3 items-start">{details.role}</td>
                      <td className="p-3 items-center flex flex-row justify-around">
                        <button
                          type="button"
                          onClick={() => editUser(details._id)}
                          className="cursor-pointer"
                        >
                          <img src={edit} alt="" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteUser(details._id)}
                          className="cursor-pointer"
                        >
                          <img src={del} alt="" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default MembersPage;
