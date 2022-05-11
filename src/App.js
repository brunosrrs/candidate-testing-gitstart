import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import "./App.css";

const App = () => {
  const fetchUserIds = async () => {
    return ["john.smith", "sara.lee", "jack.ma"];
  };

  const checkStatus = async (userId) => {
    return Math.random() > 0.8
      ? { status: "offline", id: userId }
      : { status: "online", id: userId };
  };

  const sendEmail = async (userId) => {
    // return if it was sucessfull or not
    return Math.random() > 0.1 ? true : false;
  };

  /*
    Question 1: 
    Find all online users and send them emails. Render the users for which the emails were successfully sent

    Step 1: Load users
    Step 2: Check users online
    Step 3: Send email for whom are online
    Step 4: Render those which the email was successfully sent
  
  */
  const [onlineUser, setOnlineUser] = useState();

  useEffect(() => {
    //loading users
    fetchUserIds()
      .then((users) => {
        console.log(users);
        return Promise.all(
          users.map(async (userId) => {
            return checkStatus(userId);
          })
        );
      })
      //checking status
      .then((response) => {
        console.log(response);
        return response
          .filter((user) => user.status === "online")
          .map((user) => user.id);
      })
      // sending emails to online users
      .then((on) => {
        console.log(on);
        return Promise.all(
          on.map(async (userId) => {
            return { sent: await sendEmail(userId), userId: userId };
          })
        );
      })
      //populating the array onlineUser with the method setOnlineUser
      .then((response) => {
        console.log(response);
        setOnlineUser(
          response.filter((user) => user.sent).map((user) => user.userId)
        );
      });
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that emails were successfully sent
          <ul>
            {
              //checking if onlineUsers is empty and returning if not a list with the users on the HTML
              !isEmpty(onlineUser) &&
                onlineUser.map((user, i) => {
                  return <li key={i}>{user}</li>;
                })
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
