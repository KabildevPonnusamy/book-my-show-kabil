import React, { useContext } from "react";
import { Card, Form, Input, Button, Typography, message } from "antd";
import { Link } from "react-router";
import UserContext from "../context/user-context";

const SignIn = () => {
  const { login } = useContext(UserContext);

  const onFinish = (values) => {
    console.log(values);
    login(values);
  };

  return (
    <div
      style={{
        padding: "24px 12px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card style={{ width: "min(420px, 100%)" }}>
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 4 }}>
          Sign In
        </Typography.Title>
        <Typography.Text type="secondary">
          Login with your email and password.
        </Typography.Text>

        <Form
          layout="vertical"
          style={{ marginTop: 16 }}
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="you@example.com" autoComplete="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Sign In
          </Button>
        </Form>

        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        
        <div style={{ marginTop: 12, fontSize: 13 }}>
          <Typography.Text type="secondary">New here?</Typography.Text>{" "}
          <Link to="/signup">Create an account</Link>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
