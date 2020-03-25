function fetch_get(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(err => {
      // console.log(err)
      throw err;
    });
}

let isLogin = false;
const loginData = {};

function Login() {
  document.getElementById("email-error").innerText = "";
  document.getElementById("password-error").innerText = "";
  let user = document.getElementById("login").value;
  let password = document.getElementById("password").value;
  var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (user === "") {
    document.getElementById("email-error").innerText = "Email error";
    return;
  }
  if (!emailRegex.test(user)) {
    document.getElementById("email-error").innerText =
      "Email error";
    return;
  }
  if (password === "") {
    document.getElementById("password-error").innerText = "password error";
    return;
  }
  loginData.user = user;
  loginData.password = password;
  isLogin = true;
  studentFile();
}

function logout() {
  document.getElementById("myLogin").style.display = "block";
  document.getElementById("bottom-box").style.display = "none";
}

function studentFile() {
  document.getElementById("chart").innerHTML = "";
  document.getElementById("studentData").innerHTML = "";
  document.getElementById("div1").innerHTML = "";
  document.getElementById("calendar").innerHTML = "";
  let url = "";
  url = `https://rt-students.com/api/getStudent/${loginData.user}&${loginData.password}`;
  const student = fetch_get(url);
  document.getElementById("password-error").innerText = ""
  student.then(students => {
    console.log(students)
    if (Object.keys(students).includes("status")) {
      document.getElementById("password-error").innerText =
        students.reason
    } else {
      const user = students[0];
      let tr = document.getElementById("studentData");
      tr.innerHTML = `<table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">נתונים</th>
              <th scope="col">סטודנט</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>תעודת זהות :</td>
              <td>${user.studentID}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>שם :</td>
              <td>${user.firstName}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>שם משפחה : </td>
              <td>${user.familyName}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>כתובת : </td>
              <td>${user.address}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>אימייל : </td>
              <td>${user.email}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>מספר טלפון : </td>
              <td>${user.mobileNumber}</td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>תאריך הרשמה : </td>
              <td>${user.registeryDate}</td>
            </tr>
          </tbody>
        </table>`;
      document.getElementById("myLogin").style.display = "none";
      document.getElementById("bottom-box").style.display = "flex";
    }
  });
}

function getCourse() {
  document.getElementById("chart").innerHTML = "";
  document.getElementById("studentData").innerHTML = "";
  document.getElementById("div1").innerHTML = "";
  document.getElementById("calendar").innerHTML = "";
  const url = `https://rt-students.com/api/getCourses/${loginData.password}`;
  const courses = fetch_get(url);
  courses.then(courses => {
    let table = `<table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">מספר קורס</th>
            <th scope="col">תעודת זהות</th>
            <th scope="col">ציון מבחן</th>
            <th scope="col">ציון פרוייקט</th>
            <th scope="col">שם הקורס</th>
          </tr>
        </thead>
        <tbody>`;
    courses.forEach((course, index) => {
      let tr = "<tr>";
      const td = `<td>${index + 1}</td>
            <td>${course.code}</td>
            <td>${course.student}</td>
            <td>${course.examMark}</td>
            <td>${course.projectMark}</td>
            <td>${course.courseName}</td>`;
      tr += td + "</tr>";
      table += tr;
    });
    table += "</tbody></table>";
    const container = document.getElementById("studentData");
    container.innerHTML = table;
  });
}

function getChart() {
  document.getElementById("chart").innerHTML = "";
  document.getElementById("studentData").innerHTML = "";
  document.getElementById("div1").innerHTML = "";
  document.getElementById("calendar").innerHTML = "";
  const url = `https://rt-students.com/api/getCourses/${loginData.password}`;
  const courses = fetch_get(url);
  courses.then(courses => {
    let chartdata = [];
    let chartLabels = [];
    const baseChartColors = {
      red: {
        bg: "rgba(245, 5, 5, 0.4)",
        bor: "rgba(245, 5, 5, 1)"
      },
      blue: {
        bg: "rgba(4, 0, 255, 0.4)",
        bor: "rgba(4, 0, 255, 1)"
      },
      green: {
        bg: "rgba(22, 212, 5, 0.4)",
        bor: "rgba(22, 212, 5, 1)"
      },
      yellow: {
        bg: "rgba(255, 238, 0, 0.4)",
        bor: "rgba(255, 238, 0, 1)"
      }
    };
    const bgColors = [];
    const borderColors = [];
    courses.forEach(chart => {
      if (chart.examMark <= 50) {
        bgColors.push([baseChartColors.red.bg]);
        borderColors.push([baseChartColors.red.bor]);
      } else if (chart.examMark <= 80) {
        bgColors.push([baseChartColors.yellow.bg]);
        borderColors.push([baseChartColors.yellow.bor]);
      } else if (chart.examMark <= 99) {
        bgColors.push([baseChartColors.green.bg]);
        borderColors.push([baseChartColors.green.bor]);
      } else if (chart.examMark === 100) {
        bgColors.push([baseChartColors.blue.bg]);
        borderColors.push([baseChartColors.blue.bor]);
      }
      let examMark = chart.examMark;
      let courseName = chart.courseName;
      chartLabels.push(courseName);
      chartdata.push(examMark);
    });
    document.getElementById("chart").innerHTML = "";
    const canvas = document.createElement('canvas');
    canvas.classList.add("myChart", "myCanvas");
    document.getElementById("chart").appendChild(canvas)
    var ctx = canvas;
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "ציוני מבחנים",
            data: chartdata,
            backgroundColor: bgColors,
            borderColor: borderColors,
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  });
}

function getCalendar() {
  document.getElementById("chart").innerHTML = "";
  document.getElementById("studentData");
  document.getElementById("div1").innerHTML = "";
  document.getElementById("calendar").innerHTML = "";
  const url = `https://rt-students.com/api/getCalendar/${loginData.password}`;
  const calendarDates = fetch_get(url);
  calendarDates.then(calendarDates => {
    const events = [];
    calendarDates.forEach(calendarDate => {
      let editedDate = changeDate(calendarDate.sessionDate);
      events.push({
        Date: new Date(editedDate),
        Title: calendarDate.teacher
      });
    });
    let settings = {};
    document.getElementById("div1").innerHTML = "";
    document.getElementById("studentData").innerHTML = "";
    let element = document.getElementById("calendar");
    caleandar(element, events, settings);
  });
}

function changeDate(date) {
  date = new Date(date).toISOString().substring(0, 10);
  const editedDate = date.split("-");
  return editedDate;
}

$(document).ready(function() {
  $(".list-group-item").click(function(e) {
    e.preventDefault();
    $(".list-group-item").removeClass("active");
    $(this).addClass("active");
  });
});


function contactPage() {
  document.getElementById("chart").innerHTML = "";
  document.getElementById("studentData").innerHTML = "";
  document.getElementById("div1").innerHTML = "";
  document.getElementById("calendar").innerHTML = "";
  
      
      let contact = document.getElementById("studentData");
      contact.innerHTML = `<div class="block2">
      <div class="divUp" style="text-align:center">
        <h2>תכתבו לנו</h2>
        <p>אתם מוזנים לשאול כל שאלה, או השירו פרטים ונצור אתכם קשר:</p>
      </div>
      <div class="row">
        
        
          <form action="/action_page.php">
            <label for="fname">שם</label>
            <input type="text" id="fname" name="firstname" placeholder="שם..">
            <label for="lname">שם משפחה</label>
            <input type="text" id="lname" name="lastname" placeholder="שם משפחה..">
            <label for="city">עיר</label>
            <select id="city" name="city">
              <option value="australia">ראשון לציון</option>
              <option value="canada">תל אביב</option>
            </select>
            <label for="subject">Subject</label>
            <textarea id="subject" name="subject" placeholder="תכתבו משהו.." style="height:100px"></textarea>
            <input type="submit" value="שלח">
          </form>
        
      </div>
    </div>`;
      document.getElementById("myLogin").style.display = "none";
      document.getElementById("bottom-box").style.display = "flex";
    };
 
