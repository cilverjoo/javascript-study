## Mongoose schema란?

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        maxLength: 50,
    },
    description: {
        type: String,
    }
}, { timeStamp: true })
```
몽구스는 사용자가 작성한 스키마를 기준으로 데이터를 DB에 넣기 전에 먼저 검사합니다. 스키마에 어긋나는 데이터가 있으면 에러를 발생시킵니다.


## Body-parser?

## jsonWeb


### 포트가 다른 클라이언트와 서버 간 request 전송을 어떻게 할까?

- cors(Cross-Origin Resource Sharing)
domain-a.com과 domain-b.com 사이 통신은 cors 정책에 의해 통제된다.
proxy로 해결할 수 있다.

create-react-app.dev/docs/proxying-api-requests-in-development/ 참고!
npm install http-proxy-middleware --save 입력
src 안에 setupProxy.js 생성

#### 프록시란 무엇일까?
- 프록시 서버는 유저와 인터넷 사이에 위치한 서버
- IP를 프록시서버에서 임의로 바꿔 인터넷에 접근하는 사람의 IP를 모르게 한다.
- 방화벽 기능, 웹 필터 기능, 캐쉬 데이터 / 공유데이터 제공 기능

프록시서버 사용 이유!

    회사에서 직원들이나 집안에서 아이들 인터넷 사용 제어
    캐쉬를 이용해 더 빠른 인터넷 이용 제공
    더 나은 보안 제공
    이용이 제한된 사이트 접근 가능


### 24강. concurrently

사용법

package.json의 script에 동시에 실행하고싶은 커맨드를 넣어준다.

별개의 커맨드는 따옴표로 감싼다.

    concurrently "command1 arg" "command2 arg"

in package.json, 

    "start": "concurrently \"command1 arg\" \"command2 arg\""

## 25강. ant design

ant design은 중국에서 웹/앱 디자인 개발을 위해 만든 프레임워크.
디자인 별 코드를 제공해준다.
react dependency이므로 client에서

    npm install antd --save

참고 : https://ant.design/


## 26. Redux 기초

리덕스는 state 관리를 해 준다.

1. props
- property 줄임말 
- 컴포넌트 간의 통신법
- 부모->자식 하향식.
- 자식 관점에서 변하지 않음

```Javascript
<ChatMessages //부모 컴포넌트가 정보를 넘겨줄 자식 컴포넌트 이름
    messages={messages} //정보의 이름을 넣어준다.
    currentMember={member}
/>
```

2. state
- 부모 컴포넌트에서 자식컴포넌트로 데이터를 보내는 것이 아닌, 컴포넌트 안에서 데이터를 전달하려면 state 필요. (컴포넌트 바깥의 store에서 상태관리를 해 준다.)
- state is mutable
- state가 변하면 re-render 된다.

```Javascript
state = {
    message: '',
    attachFile: undefined,
    openMenu: false,
};
```

Redux 데이터 Flow(strict unidirectional data flow)
: action ->  reducer -> store -> react component -> action

action : 상태 변화를 설명하는 object
```Javascript
{ type: 'LIKE_ARTICLE', articleId: 42 }  //Mary liked article  42.
{ type: 'FETCH_USER_SUCCESS', response: {id: 3, name: 'Mary'} }
{ type: 'ADD_TODO', text: 'Read the Redux docs.' }
```

reducer : 애플리케이션의 상태 변화를 설명하는 function
```Javascript
(previousState, action) => nextState //이전 state와 action object를 받은 후에 next state를 return한다.
```

store : 어플리케이션의 state를 포괄하는 object / 어플리케이션의 모든 상태 트리를 갖고 있다.


## 27. Redux up!!

npm install redux react-redux redux-promise redux-thunk --save

redux store는 plain object만 받으므로 promise, function을 받는 방법을 redux-promise, redux-thunk와 같은 middleware가 가르쳐줄 수 있다. 

import { Provider } from 'react-redux'


## 29. Redux hook!!
