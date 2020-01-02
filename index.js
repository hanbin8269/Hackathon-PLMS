const Koa = require('koa');
const Router = require('koa-router');
var fs = require('fs');

var obj = {
   users: []
};

const hostname = '192.168.1.84';

const app = new Koa();
const router = new Router();
var mysql = require('koa-mysql');
const pagesCtrl = require('./pages.controller');
 
var park_id = new Array(100);
var park_name = new Array(100);
var park_add = new Array(100);
var park_peo_now = new Array(100);
var park_peo_max = new Array(100);
var park_pos_x = new Array(100);
var park_pos_y = new Array(100);
var park_height = new Array(100);
var park_manager = new Array(100);
var park_disable = new Array(100);
var park_women = new Array(100);
var park_common = new Array(100);
var park_num = new Array(100);
var i = 0,j =0;
var content = new Array(100);
var rows;
// Create a MySQL connection pool (do this once)
var db = mysql.createPool({ user: 'test',
 password: 'qpalzm2612?', 
 database: 'parking', 
 host: '192.168.1.76' 
});
router.get('/',pagesCtrl.start);
router.get('/map',pagesCtrl.map);
router.get('/manager',pagesCtrl.list);
router.get('/login/',pagesCtrl.login);
router.get('/detail/:name',(ctx, next) => {
    var { name } = ctx.params; // 라우트 경로에서 :파라미터명 으로 정의된 값이 ctx.params 안에 설정됩니다.
   
    ctx.body = `<!DOCTYPE html>
    <html lang="ko">
    <head>
        <title>주차장 상세정보</title>
        <style>
    *{
        background: #ecfcff;
        font-family: 'Noto Sans KR', sans-serif;
    }
    .top-layout{
        position:absolute;
        top:6.7%;
        border-bottom: solid #54a7b6 10px;
        width:100%;
        float:left;
    }
    
    .right{
        padding:500px;
        position:absolute;
        left:50%;
        top:7.8%;
        bottom:0%;
        border-left: solid 4px #54a7b6 ;
    }
    
    body{
        font-size:20px;
    }
    
    .table {
        border-collapse: collapse;
    }  
    .table th {
        color: #168;
        background: #f0f6f9;
        text-align: center;
    }
    .table th, .table td {
        padding: 10px;
        border: 1px solid #ddd;
    }
    .table th:first-child, .table td:first-child {
        border-left: 0;
    }
    .table th:last-child, .table td:last-child {
        border-right: 0;
    }
    .table tr td:first-child{
        text-align: center;
    }
    
    ul{
        line-height:50px;
        position:absolute;
        top:15%;
        left:5%;
        float:left;
    }
    #parking-lot-name{
        position:absolute;
        top:2%;
        left:5%;
        font-size:25px;
    }
    #add-info{
        height:70px;
    }
    .table caption{
        font-size:25px;
        color:rgba(71, 71, 71, 0.993);
    }
    .table thead{
        height:10px;
    }
    #manage
    #logo{
        position:absolute;
        top:1.8%;
        left:2%;
        height: 4%;
        width: 2%;
    }
    #graph{
        position:absolute;
        top:13%;
        right:23%;
    }
    #graph-name{
        position:absolute;
        top:10%;
        right:42%;
    }
    #parking-lot-img{
        border:solid black 1px;
        position:absolute;
        top:15%;
        left:27%;
    }
        </style>
        <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700,900&display=swap&subset=korean" rel="stylesheet">
    </head>
    <body>
            <div ><img src="logo.jpg" id="logo"></div>
            <div class="top-layout"></div>
            <div id="parking-lot-name"><strong>${park_name[name]}</strong></div>
            <div class="left">
                <div id="parking-lot-img"><img src="test-img.PNG"></div>
                <ul>
                   <li><div id="parking-lot-name">이름 : ${park_name[name]}</div></li>
                   <li><div id="address">주소 : ${park_add[name]}</div>
                   <li><div id="can-parking">주차공간 : ( ${park_peo_now[name]} / ${park_peo_max[name]} )</div>
                   <li><div id="max-heght">최대 차체 높이 : ${park_height[name]}</div><br>
                   <li>
                       <div class="table" id="special-parking">
                            <table border="ctx.params">
                                <caption><strong> - 특수주차구역 - </strong></caption>
                                <thead><tr><th>장애인</th><th>여성</th><th>일반</th></tr></thead>
                                <tbody><tr><td>${park_disable[name]}</td><td>${park_women[name]}</td><td>${park_common[name]}</td></tr></tbody>
                            </table><br>
                        </div>
                    </li>
                    <li>
                        <div class="table" id="add-info">
                            <table border="1">
                                <caption><strong>- 부가정보 - </strong></caption>
                                <thead><tr><th>관리자이름</th><th>${park_manager[name]}</th></tr></thead>
                                <tbody><tr><td>전화번호</td><td>${park_num[name]}</td></tr></tbody>
                            </table>
                        </div>
                </ul>
            </div>
            <div class="right">
                    <div id="graph-name"><strong> - 시간별 이용자수 -</strong><br></div>
                <div id="graph"> <img src="test.PNG" ></div>
    
            </div>
    
    </body>
    </html>
    `;
});
app.use(router.routes());
app.use(router.allowedMethods());
// Run sample app

app.use(function* () {
    try {
        
        // Execute a sample query (with params)
        rows = yield db.query("select * from zone");
            console.log('reload!');
            
            for(i = 0; i < rows.length;i++){
                park_id[i] = rows[i].id;
                park_peo_now[i] = rows[i].now_people;
                park_peo_max[i] = rows[i].max_people;
                park_name[i] = rows[i].name;
                
                park_pos_x[i] = rows[i].locationX;
                park_pos_y[i] =  rows[i].locationY;
            }

            

           
            for(j = 0; j < rows.length;j++){
                console.log(park_pos_x,park_pos_y);
                content[j] =`'<div class="wrap">  '+
            '    <div class="info">  '+
            '        <div class="title">  '+
            '            ${park_name[j]}     '       + 
            '            <div><a href="http://192.168.1.84:4000/manager" class="manage">관리</a></div> '+
            '        </div>  '+
            '        <div class="body">  '+
            '            <div class="desc">  '+
            '                <div class="ellipsis"></div>  '+
            '                <div class="jibun ellipsis">( ${park_peo_now[j]} / ${park_peo_max[j]} ) ' +
            '                <div><a href="http://192.168.1.84:4000/detail/${park_id[j]-1}"  class="link">홈페이지</a></div> '+
            '            </div>  '+
            '        </div>  '+
            '    </div>     '+
            '</div>'`;
            }

            fs.readFile('./src/users.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                obj = JSON.parse(data); //now it an object
                for (i = 0 ; i < rows.length;i++ ){
                    obj.users[i] = {id :  park_id[i] ,park_peo_now :park_peo_now[i],park_peo_max :park_peo_max[i],park_name :park_name[i],park_pos_x :park_pos_x[i],park_pos_y :park_pos_y[i],content :content[i]};
                }//add some data
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('./src/users.json', json, 'utf8', function (){}); // write it back 
            }}); 
            // Output test result (3)
            this.body = '';
        }
    
    catch (err) {
        console.log('ersr');
        // 500 Internal Server Error
        this.status = 500;
        this.body = { error: err };
    }
});



app.use(router.routes()).use(router.allowedMethods());

app.listen(4000,hostname,() => {
});