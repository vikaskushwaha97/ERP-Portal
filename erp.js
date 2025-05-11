const students = [
    { name: 'Vikas Kushwaha', roll: '1032201001', branch: 'Division 1', attendance: 94 },
    { name: 'Vanchita Nagdeo', roll: '1032201002', branch: 'Division 1', attendance: 88 },
    { name: 'Akash Agarwal', roll: '1032201003', branch: 'Division 1', attendance: 91 },
    { name: 'Om Vanjani', roll: '1032201004', branch: 'Division 2', attendance: 96 },
    { name: 'Nakul Khetwani', roll: '1032201005', branch: 'Division 2', attendance: 87 },
    { name: 'Gayatri Lillore', roll: '1032201006', branch: 'Division 2', attendance: 90 },
    { name: 'Verma Isha', roll: '1032201007', branch: 'Division 2', attendance: 93 },
    { name: 'Priya Rathod', roll: '1032201008', branch: 'Division 2', attendance: 85 },
    { name: 'Sopan Parnate', roll: '1032201009', branch: 'Division 1', attendance: 92 },
    { name: 'Sahil Bankar', roll: '1032201010', branch: 'Division 1', attendance: 89 },
    { name: 'Ansh Singh', roll: '1032201011', branch: 'Division 1', attendance: 86 },
    { name: 'Krishna Dawkar', roll: '1032201012', branch: 'Division 2', attendance: 95 }
  ];
  

  function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (username && password) {
      document.querySelector('.login-box').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';
      renderTable();
    } else {
      alert('Please enter username and password');
    }
  }
  
  
  function renderTable() {
    const tbody = document.getElementById('table-body');
    const searchValue = document.getElementById('search').value.toLowerCase();
    const divisionValue = document.getElementById('division-filter').value;
  
    tbody.innerHTML = '';
    students.forEach((student, index) => {
      if ((student.name.toLowerCase().includes(searchValue) || student.roll.includes(searchValue)) &&
          (divisionValue === '' || student.branch === divisionValue)) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${student.name}</td>
          <td>${student.roll}</td>
          <td>${student.branch}</td>
          <td id="attendance-${index}">${student.attendance}%</td>
          <td><canvas id="chart-${index}"></canvas></td>
          <td>
            <span class="present-label" id="present-${index}" onclick="markAttendance(${index}, true)">Present</span>
            <span class="absent-label" id="absent-${index}" onclick="markAttendance(${index}, false)">Absent</span>
          </td>
        `;
        tbody.appendChild(tr);
        renderChart(index, student.attendance);
      }
    });
  }
  
  function renderChart(index, attendance) {
    const ctx = document.getElementById(`chart-${index}`).getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Present', 'Absent'],
        datasets: [
          {
            data: [attendance, 100 - attendance],
            backgroundColor: ['#4CAF50', '#FF5252'],
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
  
  function markAttendance(index, isPresent) {
    let student = students[index];
    if (isPresent) {
      document.getElementById(`present-${index}`).classList.add('disabled'); 
      document.getElementById(`absent-${index}`).classList.remove('disabled'); 
      if (student.attendance < 100) student.attendance += 1;
    } else {
      document.getElementById(`absent-${index}`).classList.add('disabled'); 
      document.getElementById(`present-${index}`).classList.remove('disabled'); 
      if (student.attendance > 0) student.attendance -= 1;
    }
    document.getElementById(`attendance-${index}`).textContent = student.attendance + '%'; 
  }


  
