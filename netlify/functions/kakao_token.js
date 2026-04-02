// 이 파일은 서버에서 실행돼요 (브라우저 X)
// 카카오 인가 코드 → 액세스 토큰 교환을 여기서 처리해요

exports.handler = async function (event) {
  // callback.html에서 보내준 인가 코드를 받아요
  const { code, redirectUri } = JSON.parse(event.body);

  // 카카오 서버에 토큰 교환 요청
  const response = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_REST_API_KEY, // ← 카카오 REST API 키
      redirect_uri: redirectUri,
      code: code,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: data.error }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ accessToken: data.access_token }),
  };
};
