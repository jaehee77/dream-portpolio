const messageContainer = document.querySelector('#d-day-message');
// messageContainer.textContent = 'D-Day 를 입력해주세요';
messageContainer.innerHTML = '<h3>D-Day 를 입력해주세요</h3>';

const container = document.querySelector('#d-day-container');
container.style.display = 'none';

const savedDate = localStorage.getItem('saved-date');
console.log(savedDate);

const dateFormMaker = function() {
    const inputYear = document.querySelector('#target-year-input').value;
    const inputMonth = document.querySelector('#target-month-input').value;
    const inputDate = document.querySelector('#target-date-input').value;
    
    const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;

    return dateFormat;
}

const counterMaker = function(data) {
  if(data !== savedDate) {
    localStorage.setItem('saved-date', data);
  }
  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0,0,0,0);
  const remaining = (targetDate - nowDate) / 1000;
  // console.log(remaining);
  if(remaining <= 0) {
    // console.log('타이머가 종료되었습니다.');
    container.style.display = 'none';
    messageContainer.innerHTML = `<h3>타이머가 종료되었습니다.</h3>`;
    messageContainer.style.display = 'block';
    setClearInterval()

    return;
  } else if(isNaN(remaining)) {
    // console.log('유효한 시간대가 아닙니다.');
    messageContainer.innerHTML = `<h3>유효한 시간대가 아닙니다.</h3>`;
    messageContainer.style.display = 'block';
    setClearInterval()

    return;
  }

  const remainObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHour: Math.floor(remaining / 3600) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60
  };

  const format = function(time) {
    if(time < 10) {
      return '0' + time;
    }
    return time;
  }

  // const documentObj = {
  //     days: document.querySelector('#days'),
  //     hours: document.querySelector('#hours'),
  //     min: document.querySelector('#min'),
  //     sec: document.querySelector('#sec'),
  // };
  
  const timeKeys = Object.keys(remainObj);
  // const docKeys = Object.keys(documentObj);

  // for(let i = 0; i < timeKeys.length; i += 1) {
      // console.log(timeKeys[i])
      // documentObj[docKeys[i]].textContent = remainObj[timeKeys[i]]; 
  // }

  // let i = 0;
  // for(let key in documentObj) {
  //   documentObj[key].textContent = remainObj[timeKeys[i]];
  //   i++;
  // }

  const docmentArr = ['days', 'hours', 'min', 'sec'];
  let i = 0;
  for(let tag of docmentArr) {
    const remainingTime = format(remainObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }

}


const intervalIdArr = [];

const starter = function(targetDateInput) {

  if(!targetDateInput) {
    targetDateInput = dateFormMaker();
  }
  
  container.style.display = 'block';
  messageContainer.style.display = 'none';

  setClearInterval();

  counterMaker(targetDateInput); // 인터벌 시작전에 초기 한번만 실행

  // setInterval(() => {
  //   counterMaker();
  // }, 1000)

  const intervalId = setInterval(() => counterMaker(targetDateInput), 1000);
  intervalIdArr.push(intervalId);
  // console.log(intervalIdArr);
}

 const setClearInterval = function() {
  localStorage.removeItem('saved-date');
  for(let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
 }
 
 const resetTimer = function() {
  container.style.display = 'none';
  messageContainer.innerHTML = `<h3>D-Day를 입력해주세요.</h3>`;
  messageContainer.style.display = "block";
  setClearInterval();
 }

 if(savedDate) {
  starter(savedDate);
 } else {
  container.style.display = 'none';
  messageContainer.innerHTML = '<h3>D-Day를 입력해 주세요.</h3>';
 }

