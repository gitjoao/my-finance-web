export default function Loading() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <i
          className="fa fa-refresh fa-spin"
          style={{
            fontSize: 32,
            marginBottom: 12,
            color: "#3c8dbc",
          }}
        />

        <p
          style={{
            fontSize: 16,
            margin: 0,
          }}
        >
          Carregando...
        </p>
      </div>
    </div>
  );
}
