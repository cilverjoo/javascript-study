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

