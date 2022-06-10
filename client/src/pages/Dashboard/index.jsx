import Navbar from "components/Navbar";
import React, { useEffect } from "react";
import "./style.css";
import SideBoxRow from "components/Dashboard/SideBoxRow";
import DetailBox from "components/Dashboard/DetailBox";
import Swal from "sweetalert2";
import axios from "axios";
import { REACT_APP_API_URL } from "constants";
import { useAuth } from "context/AuthContext";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { user, token, isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = React.useState("");

  useEffect(() => {
    console.log("DAhs");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleCreateBtnClick = async () => {
    await Swal.fire({
      title: "Shorten your Link",
      html:
        '<textarea id="originalUrl" rows="5" class="swal2-input-textarea swal2-textarea "  placeholder="Enter your long url" ></textarea>' +
        '<input id="title" placeholder="Title*" class="swal2-input">',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        let originalUrl = document.getElementById("originalUrl").value;
        let title = document.getElementById("title").value;
        console.log(originalUrl, title, "darr");
        // axios request to create a short link
        return new Promise((resolve, reject) => {
          axios
            .post(
              `${REACT_APP_API_URL}/api/shorten`,
              { originalUrl, title },
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(async (res) => {
              console.log(res.data);
              Swal.fire({
                title: `Shortened Link ${REACT_APP_API_URL}/api/${res.data.id}`,
                text: res.data.shortUrl,
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Copy",
                cancelButtonText: "Close",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                reverseButtons: true,
              }).then((result) => {
                console.log(result);
                if (result.value) {
                  navigator.clipboard.writeText(
                    `${REACT_APP_API_URL}/api/${res.data.id}`
                  );
                  Swal.fire(
                    "Copied!",
                    "Shortened Link copied to clipboard",
                    "success"
                  );
                }
                resolve();
              });
            })
            .catch((err) => {
              console.log(err.response.data);
              Swal.fire({
                title: "Error",
                text: "Server Error" || err.response.data.message,
                icon: "error",
              });
              reject();
            });
        });
      },
      focusConfirm: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      allowOutsideClick: false,
      showConfirmButton: true,
      confirmButtonText: "Create",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });
  };

  return (
    <div className="dashboardBlock">
      <div className="absolute dashboardOverlay"></div>
      <div className="  flex-1 z-10 ">
        <Navbar />
        <div className="flex flex-col h-full">
          {/* Header */}
          <section className="flex h-16 items-center w-full justify-between p-5   ">
            <div className="w-16 text-2xl font-extrabold ">Links</div>
            <div className=" flex  pr-5 text-bold ">
              <div className="w-24 flex justify-center items-center">
                <button
                  className=" w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
                  onClick={handleCreateBtnClick}
                >
                  Create
                </button>
              </div>
            </div>
          </section>
          {/* Header Section end */}
          <section className="flex gap-3 h-16 p-5 item-center w-full">
            <div className="w-24 flex justify-center items-center">
              <button
                className=" w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
                // onClick={onClick}
              >
                Filter
              </button>
            </div>

            <div className="w-24 flex justify-center items-center">
              <button
                className=" w-full bg-transparent border-2 border-solid  border-indigo-500 hover:bg-indigo-700 hover:border-white text-white font-bold py-2 px-4 rounded-md"
                // onClick={onClick}
              >
                Tags
              </button>
            </div>
          </section>
          <section className="p-5 grid grid-cols-4  border-lime-500 border-2">
            {/* List side */}
            <div className=" col-span-1 h-full border-2 border-lime-300 ">
              <div className="flex h-16 items-center justify-between ">
                Result{" "}
              </div>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                return (
                  <SideBoxRow
                    item={item}
                    key={index}
                    selectedLink={selectedLink}
                    setSelectedLink={setSelectedLink}
                  />
                );
              })}
            </div>
            {/* Detail SIde */}
            <div className="border-lime-500 border-2 col-span-3">
              <DetailBox selectedLink={selectedLink} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
