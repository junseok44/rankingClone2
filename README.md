<!-- 1. 일단 한 라인에서 이동하는것 -->

<!-- 2. 크로스 라인 이동하는것

-->

<!-- 지금 문제는 아이템이 없는 라인으로 이동이 안됨.
-->
<!-- 왜냐하면 아이템이 없으니까 height가 0이 되거든. -->

<!-- 또 아이템 라인에서 다른 라인으로 이동이 안됨.
이거는 dragdropContext를 동일한 것으로 바꿔놓음으로써 해결.  -->

2-1. 리덕스 적용해보기.

--> 일단 싱글라인부터. 그리고 disaptch는 컨테이너 없이 그냥 적용해보기.

--> typescript redux documentation 읽어보기.
--> 구체적으로 container라던지. 그 값을 제공해주는게 아니라 짬밥해서 쓰는중.
--> 지금 reducer action type 부분에서 에러가 나서 그냥 reducer를 any라고 해두긴 했음.
--> createSlice로도 한번 해보기.

3. 이미지 만들어서 사용하는것

4. 서버를 활용해서 이미지 업로드/ 이미지 삭제기능.
