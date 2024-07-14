const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
  },
});

io.listen(4000);

const players = []; //현재 입장한 유저정보

io.on("connection", (socket) => {
  console.log("연결됨!!");

  io.emit("players", players);

  socket.on(
    "initialize",
    ({ tempNickname, tempJobPosition, selectedCharacterGlbNameIndex }) => {
      // 새로운 플레이어 객체 생성
      const newPlayer = {
        id: socket.id,
        position: [0, 0, 0], // 초기 위치
        nickname: tempNickname,
        jobPosition: tempJobPosition,
        selectedCharacterGlbNameIndex, // 선택된 캐릭터 모델 인덱스
        myRoom: {
          objects: [], // 플레이어 마이룸 객체
        },
      };
      players.push(newPlayer); //전체 플레이버 배열에 새 플레이어 추가

      socket.emit(
        "initialize",
        // 클라이언트에 initialize라는 이벤트로 지금 만들어진 new player에 해당하는 플레이어의 정보를 보내줌으로서
        // 각각의 브라우저 화면에 new player에 대한 정보를 나타낼 수 있게 해줌
        players.find((p) => p.id === socket.id)
      );
      io.emit("enter", {
        // 클라이언트에 enter라는 이벤트로 새로 만들어진 소켓id, 닉네임, 직군 정보를 보내줌
        id: socket.id,
        nickname: newPlayer.nickname,
        jobPosition: newPlayer.jobPosition,
      });

      io.emit("players", players); // 한번 더 바뀐 플레이어 정보를 emit 해주면서 각각의 브라우저를 최신화
    }
  );

  //유저가 맵에서 이동할때 발생
  socket.on("move", (position) => {
    console.log("players", players);
    const player = players.find((p) => p.id === socket.id);
    if (player) {
      player.position = position; // 플레이어 위치 업데이트
      io.emit("players", players); // 모든 클라이언트에게 업데이트 된 플레이어 정보 전송
    }
  });

  // 플레이어 채팅 메시지
  socket.on("newText", (text) => {
    const sender = players.find((p) => p.id === socket.id);
    if (sender) {
      const { id, nickname, jobPosition } = sender;
      if (nickname && jobPosition) {
        io.emit("newText", {
          // 모든 클라이언트에게 새 메시지 전송
          senderId: id,
          senderNickname: nickname,
          senderJobPosition: jobPosition,
          text,
          timestamp: new Date(),
        });
      }
    }
  });

  // 마이룸에 변경사항 일어났을때 이벤트
  socket.on("myRoomChange", (myRoom, otherPlayerId) => {
    console.log("방이 바뀌었나?");
    const id = otherPlayerId || socket.id; //자기방에 변화를 줬는지 남의방에 변화를 줬는지 id로 받아와서
    const player = players.find((p) => p.id === id); // 그 id에 해당하는 플레이어를 찾고
    player.myRoom = myRoom; // 플레이어의 마이룸을 함수에서 받아온 마이룸으로 최신화
    io.emit("players", players); // 바뀐걸 모든 유저에게 전송해서 최신화
  });

  socket.on("disconnecting", () => {
    // 접속이 끊어지기 직전에 발생
    console.log("연결이 끊어지는 중");
    // players 배열에서 현재 소켓id와 일치하는 플레이어 찾기
    const player = players.find((p) => p.id === socket.id);
    if (player) {
      io.emit("exit", {
        id: socket.id,
        nickname: player.nickname,
        jobPosition: player.jobPosition,
      });
    }
  });

  socket.on("disconnect", () => {
    // 접속이 완전히 끊겼을때 발생
    console.log("연결이 끊어짐!");
    // 현재 socket.id에 해당하는 유저의 인덱스를 splice로 제거해줌으로서
    // 유저가 나간걸 표시하고 io.emit으로 최신화
    players.splice(
      players.findIndex((p) => p.id === socket.id),
      1
    );
    io.emit("players", players);
  });
});
