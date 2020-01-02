var fs = require('fs');
var contents = fs.readFileSync( "c:/nodejs/hackathon/src/users.json");
var jsonContent = JSON.parse(contents);


exports.start = (ctx) =>{
    ctx.body = `<!DOCTYPE html>
    <html>
    <head>  
        <meta charset="utf-8">
        <title>Parking Lot Management System</title>
        <style>
            @import url('https://fonts.googleapis.com/css?family=Lobster+Two');
    h1 {
      font-family: 'Lobster Two', cursive;
      font-size: 5rem;
      text-shadow: 0px 1px 0px rgba(255, 255, 255, 1);
      color: #343434;
    }
    .container {
      position: relative;
      z-index: 0;
      background-color: #ededed;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
    }
    .pulse {
      z-index: -1;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 30rem;
    }
    .pulse circle {
      fill: #ff5154;
      transform: scale(0);
      opacity: 0;
      transform-origin: 50% 50%;
      animation: pulse 2s cubic-bezier(0.5, 0.5, 0, 1);
      animation-iteration-count:infinite;
    }
    .pulse circle:nth-child(2) {
      fill: #7fc6a4;
      animation: pulse 2s 0.75s cubic-bezier(0.5, 0.5, 0, 1);
      animation-iteration-count:infinite;
    }
    .pulse circle:nth-child(3) {
      fill: #e5f77d;
      animation: pulse 2s 1.5s cubic-bezier(0.5, 0.5, 0, 1);
      animation-iteration-count:infinite;
    }
    @keyframes pulse {
      25% {
        opacity: 0.4;
      }
      100% {
        transform: scale(1);
      }
    }
    </style>
    </head>
    <body>
            <div class="container" onclick="window.location.href='http://192.168.1.84:4000/login';" style="cursor:pointer">
        
                    <h1>Parking Lot <br>Management System</h1>
                    
                    <svg class="pulse" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <circle id="Oval" cx="512" cy="512" r="512"></circle>
                        <circle id="Oval" cx="512" cy="512" r="512"></circle>
                        <circle id="Oval" cx="512" cy="512" r="512"></circle>
                </svg>
                    
                </div>
    </body>
    </html>`;
}
exports.map = (ctx) =>{
    ctx.body = `<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <title>Parking Lot Management System</title>
        <style>
        *{
            font-family: 'Noto Sans KR', sans-serif;    
        }
        .top-layout{
            border-bottom: solid #93b5b3 10px;
            width:100%;
            float:left;
            padding:5px;
            font-size:30px;
            }
         #txt-search{
                width: 500px;
                height: 40px;
                border: 1px solid #fdfdfd00;
                border-radius: 7px;
                background-color:#d2fafb;
                box-sizing: border-box;
                vertical-align: middle;
                outline: none;
                text-indent: 10px;
                font-size: 17px;
            }
            
         .btn-search{
                width: 100px;
                height: 45px;
                border: 1px solid #ffffff00;
                border-radius: 7px;
                background-color:#d2fafb;
                margin-left: 7px;
                vertical-align: middle;
                outline: none;
                cursor: pointer;
            }
        .search{
            position:absolute;
            right:6%;
            top:13%;
            border:4px solid #93b5b3;
            border-radius:14px;
            width:650px;
            padding:13px;
        }
        #title-search{
            font-size:25px;
        }
        .right{
            padding:500px;
            position:absolute;
            left:50%;
            top:8.4%;
            bottom:0%;
            border-left: solid 4px #93b5b3 ;
        }
        #logo{
            position:absolute;
            top:1.8%;
            left:2%;
            height: 4%;
            width: 2%;
        }
        #map{
            border:solid black 1px;
            position:absolute;
            top:13%;
            left:4%;
            width: 796px;
            height: 704px;
        }
        a.manage{
             position: absolute;
             right: 10px;
             top: 3px;
        }
        .wrap {position: absolute;left: 0;bottom: 10px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}
        .wrap * {padding: 0;margin: 0;}
        .wrap .info {padding:3px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #e6f8f9;}
        .wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}
        .info .title {padding: 5px 0 0 10px;height: 30px;background: #6bc5d2;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;}
        .info .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}
        .info .close:hover {cursor: pointer;}
        .info .body {position: relative;overflow: hidden;}
        .info .desc {position: relative;margin: 13px 0 0 30px;height: 50px;}
        .desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
        .desc .jibun {font-size: 20px;color: #888;margin-top: -10px;}
        .info .img {position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;}
        .info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 10;width: 22px;height: 12px;background: url('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
        .info .link {color: #5085BB;}

        </style>
        <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700,900&display=swap&subset=korean" rel="stylesheet">
    </head>
    <body>
        <div class="all">
            <div ><img src="logo.jpg" id="logo"></div>
            <div class="top-layout"> <strong> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Parking Lot Management System </strong></div>
            
            
            <div id='map'></div>
            
            <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=bc81a4c240fda08f596230e20799db5a"></script>
            <script>

            var mapContainer = document.getElementById('map'), // 지도의 중심좌표
                mapOption = { 
                    center: new kakao.maps.LatLng(36.576203, 128.505716), // 지도의 중심좌표
                    level: 2 // 지도의 확대 레벨
                }; 
            
            var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
            

            // 커스텀 오버레이에 표시할 컨텐츠 입니다
            // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
            // 별도의 이벤트 메소드를 제공하지 않습니다 
            

        var positions = [
            {
                content: ${jsonContent.users[0].content}, 
                latlng: new kakao.maps.LatLng(${jsonContent.users[0].park_pos_x},${jsonContent.users[0].park_pos_y})
            },
            {
                content: ${jsonContent.users[1].content}, 
                latlng: new kakao.maps.LatLng(${jsonContent.users[1].park_pos_x},${jsonContent.users[1].park_pos_y})
            },
            {
                content: ${jsonContent.users[2].content}, 
                latlng: new kakao.maps.LatLng(${jsonContent.users[2].park_pos_x},${jsonContent.users[2].park_pos_y})
            }
        ];
        
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[0].latlng // 마커의 위치
            });
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[1].latlng // 마커의 위치
            });
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[2].latlng // 마커의 위치
            });
        
            // 마커에 표시할 인포윈도우를 생성합니다 
            var overlay = new kakao.maps.CustomOverlay({
                content:${jsonContent.users[0].content},
                map: map,
                position: positions[0].latlng    
            });
            var overlay = new kakao.maps.CustomOverlay({
                content: ${jsonContent.users[1].content},
                map: map,
                position: positions[1].latlng    
            });
            var overlay = new kakao.maps.CustomOverlay({
                content: ${jsonContent.users[2].content},
                map: map,
                position: positions[2].latlng    
            });
        
            // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
            // 이벤트 리스너로는 클로저를 만들어 등록합니다 
            // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
          
        
            </script>
            

            <div class="right"></div>
                <div class="search">
                        <div id="title-search">주차장 이름 검색</div>
                        <input id="txt-search" type="text"/>
                        <button class="btn-search">검색</button>
                </div>
        </div>
    </body>`;
}

exports.login = (ctx) =>{
    ctx.body = `<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <title>Admin-Login</title>
        <style>
            #title{
                font-size:25px;
                position:absolute;
                border-bottom: solid orange 5px;
                width:700px;
                color:black;
                top:21%;
                left:28%;
            }
            .Login{
                padding:50px;
                position:absolute;
                left:34%;
                top:35%;
                width:300px;
                font-size:25px;
            }
    
            #btn-login{
                border-radius:25%;
                width:110px;
                height:110px;
                position:absolute;
                top:35%;
                left:90%;
                font-size:18px; 
            }
            #btn-login:hover{
                background-color:rgba(202, 202, 202, 0.719);
            }
            #Login_login, #Login_password{
                width:100px;
                height:30px;
                font-size:20px;
            }
        </style>
    </head>
    <body>
        <div id="title"><h1>로그인</h1></div>
        <div class="Login">
            <form action = "http://192.168.1.84:4000/map" method="GET"accept-charset="utf-8" >
                <div id="Login_login"><label>Admin ID<input type="text" size="30px" value="" ></label></div><br>
                <div id="Login_password"><label>Password<input type="password" size="30px" value=""></label></div>
                <input type="submit" value="로그인" id="btn-login">
            </form>
        </div>
    </body>`;
}

exports.list = (ctx) => {
    console.log(jsonContent.users[0].id);
    ctx.body = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Admin Page</title>
        <style>
            *{
                background-color:azure;
            }
    
            .title{
                position: absolute;
                left:30px;
                border-bottom: solid 3px rgb(72, 147, 179);
                width:1800px;
            }
        </style>
    </head>
    <body>
        <div class="background-layout">
            <div class="title"><h1>Administrator</h1></div>
            <div class="center-layout"></div>
        </div>
    </body>
    </html>`;
};