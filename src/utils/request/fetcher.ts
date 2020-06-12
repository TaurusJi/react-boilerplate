interface IProps {
  method: "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
  payload: any;
}

type Fetcher<JSON = any> = (
  props: IProps
) => (input: RequestInfo, init?: RequestInit) => Promise<JSON>;

const fetcher: Fetcher = (props) => async (input, init?) => {
  const res = await fetch(input, {
    ...init,
    method: props.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props.payload),
  });

  return res.json();
};

export default fetcher;
