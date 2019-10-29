let dataUrl = "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97";
let dataOrigin; //取回的資料
let dataRecords; //dataOrigin 中的旅遊資料
let selecTowns = document.querySelector(".selectowns");


let dataZone = ["- - 請選擇行政區 - -"]; //用來產生 select 的陣列

let xhr = new XMLHttpRequest();
xhr.open("get", dataUrl, true);
xhr.send();
xhr.onload = function () {
    dataOrigin = JSON.parse(xhr.responseText);
    dataRecords = dataOrigin.result.records
    console.log(dataRecords)
    //挑出旅遊資料中的行政區
    dataRecords.forEach(function (item, index, arr) {
        for (let i = 0; i < dataZone.length; i++) {
            if (item.Zone == dataZone[i]) {
                break;
            }
            //如果「旅遊資料中的行政區」不在陣列中，就放入陣列
            else if (item.Zone != dataZone[i] && i == dataZone.length - 1) {
                dataZone.push(item.Zone);
            }
        }
    });
    showOpts(dataZone); //產生 options in select
};

function showOpts(data) {
    for (let i = 0; i < data.length; i++) {
        let opt = document.createElement("option");
        opt.setAttribute("value", data[i]);
        opt.textContent = data[i];
        selecTowns.appendChild(opt);
    }
}

// 點擊「select中選項」或「頁碼」產生資料
let ctnTitle = document.querySelector(".title");
let ctnSites = document.querySelector(".list");
// let ctnPages = document.querySelector(".content-pages");
let zoneName;
// let pages; // 產生的頁數
// let currentPage; // 目前所在頁數
// let hits; // 該區總共多少筆資料
selecTowns.addEventListener("change", getData,false);

// 點擊「熱門行政區」產生資料
let hotsZone = document.querySelector(".hots-zone");
hotsZone.addEventListener("click", checkZone);

function checkZone(e) {
    if (e.target.nodeName == "BUTTON") {
        let txt = e.target.textContent;
        // 讓「select的選項」=「點擊的熱門行政區」
        for (let i = 0; i < selecTowns.options.length; i++) {
            if (txt == selecTowns.options[i].text) {
                selecTowns.options[i].selected = true;
            }
        }
        let data = {
            target: {
                value: txt
            }
        };
        getData(data);
    }
}


function getData (e){
    zoneName = e.target.value;
    console.log(zoneName)
    if (zoneName == dataZone[0]) {
        ctnTitle.innerHTML = "請選擇行政區";
    } else {
        ctnTitle.innerHTML =` ---${zoneName}---`;
    }
    var str ='';
    var len = dataRecords.length;  
    for(var i=0;i<len;i++){
        if( zoneName == dataRecords[i].Zone){
        str+=`<li><img src="${dataRecords[i].Picture1}"><p class="name">${dataRecords[i].Name}</p><p>開放時間：${dataRecords[i].Opentime}</p><p>地址：${dataRecords[i].Add}</p><p>電話：${dataRecords[i].Tel}</p></li>`;
    }        

}
ctnSites.innerHTML=str;
 
}


