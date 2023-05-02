import { Stomp } from '@stomp/stompjs';
import { useEffect, useState, useRef, useCallback, memo } from 'react';
import SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';
import SquareChatInp from './SquareChatInp';
// import { subscribe } from 'diagnostics_channel';

export default memo(function SquareChat() {
  // const baseURL = 'ws://localhost:8080/api/chat/websocket';
  const baseURL = 'http://k8a505.p.ssafy.io:8080/api/chat/websocket';
  // const baseURL = 'http://localhost:8080/api/ws/chat';
  const client: any = useRef({});
  const roomId = 1;
  const [userId, setUserId] = useState('1');
  const [message, setMessage] = useState('');

  const connect = () => {
    // 연결할 때
    client.current = new StompJS.Client({
      brokerURL: baseURL,
      connectHeaders: {
        login: 'user',
        password: 'password',
      },
      onConnect: () => {
        // setConnectd(true);
        console.log('연결댐');

        subscribe(); // 연결 성공 시 구독하는 로직 실행
      },
      onWebSocketError: (err) => {
        console.log(err);
      },
    });
    client.current.activate(); // 클라이언트 활성화
  };

  const subscribe = () => {
    client.current.subscribe('/sub/chat/room/' + roomId, (body: any) => {
      const json_body = JSON.parse(body.body);
      console.log(json_body);
      // setChatList((_chat_list) => [..._chat_list, json_body]);
    });
  };

  useEffect(() => {
    connect();
  }, []);

  const sendMessage = (message: string) => {
    client.current.publish({
      destination: '/pub/chat/message',
      body: JSON.stringify({
        type: 'TALK',
        roomId,
        sender: userId,
        message: message,
      }),
    });
  };

  // const sock = new SockJS(baseURL);
  // const ws = Stomp.over(() => {
  //   return sock;
  // });
  // ws.activate();
  // // ws.reconnect_delay = 5000;

  // const connect = () => {
  //   ws.connect({}, () => {
  //     console.log('연결됨');
  //     ws.subscribe(baseURL + '/sub/chat/room/' + roomId, (message) => {
  //       const msg = JSON.parse(message.body);
  //       console.log(msg);
  //     });
  //     ws.send(
  //       baseURL + '/pub/chat/message',
  //       {},
  //       JSON.stringify({ type: 'ENTER', roomId, sender: userId })
  //     );
  //   });
  // };
  // const sendMessage = (message: string) => {
  //   ws.send(
  //     baseURL + '/pub/chat/message',
  //     {},
  //     JSON.stringify({ type: 'TALK', roomId, sender: userId, message })
  //   );
  // };

  const changeMsg = useCallback((e: any) => {
    setMessage(e.target.value);
  }, []);

  return (
    <div>
      <p>유저ID</p>
      <input
        type="text"
        name=""
        id=""
        value={userId}
        onChange={(e) => {
          setUserId(e.target.value);
        }}
      />
      <p>메시지</p>
      {/* <input type="text" name="" id="" value={message} onChange={changeMsg} />
      <button onClick={sendMessage}>메시지 보냉</button> */}
      <SquareChatInp
        message={message}
        changeMsg={changeMsg}
        sendMessage={sendMessage}
      />
      <button onClick={() => console.log(client.current.connected)}>
        소켓소켓
      </button>
    </div>
  );
});
