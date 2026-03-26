import React, { useEffect } from "react";
import { Row, Col, Spin, Alert } from "antd";
import Movie from "../components/Movie";
import { fetchMovies } from "../lib/api";
import useHttp from "../hooks/useHttp";

const AllMovies = () => {
  const { data, isLoading, error, sendRequest } = useHttp(fetchMovies, true);

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div style={{ padding: "16px 8px", maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 16, fontSize: "clamp(1.25rem, 4vw, 1.5rem)" }}>
        Movies in Theatres
      </h2>

      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "24px 0",
          }}
        >
          <Spin size="large" description="Loading movies..." />
        </div>
      )}

      {!isLoading && error && (
        <div style={{ marginBottom: 16 }}>
          <Alert
            type="error"
            message="Failed to load movies"
            description={error}
            showIcon
          />
        </div>
      )}

      {!isLoading && !error && (
        <Row gutter={[6, 6]}>
          {data &&
            data.map((movie) => (
              <Col key={movie._id} xs={12} sm={8} md={6} lg={4}>
                <Movie movie={movie} />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
};

export default AllMovies;
