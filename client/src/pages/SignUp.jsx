import React, { useEffect, useRef } from 'react'
import { Card, Form, Input, Button, Typography, Select, message } from 'antd'
import { Link, useNavigate } from 'react-router'
import { registerUser } from '../lib/api';
import useHttp from '../hooks/useHttp';

const SignUp = () => {
    const navigate = useNavigate()

    const {data, isLoading, error, sendRequest } = useHttp(registerUser, false);

    const onFinish = (values) => {
        sendRequest(values);
    }

    useEffect(() => {
        if (data) {
            message.success('Registered successfully. Please sign in...');
            navigate('/signin');
        }
    }, [data, navigate])

    return (
        <div style={{ padding: '24px 12px', display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: 'min(420px, 100%)' }}>
                <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 4 }}>
                    Sign Up
                </Typography.Title>
                <Typography.Text type="secondary">
                    Create an account with your email and password.
                </Typography.Text>

                <Form
                    layout="vertical"
                    style={{ marginTop: 16 }}
                    onFinish={onFinish}
                    requiredMark={false}
                    initialValues={{ role: 'User' }}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email' },
                        ]}
                    >
                        <Input placeholder="you@example.com" autoComplete="email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password' }]}
                    >
                        <Input.Password placeholder="••••••••" autoComplete="new-password" />
                    </Form.Item>

                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please select a role' }]}
                    >
                        <Select
                            options={[
                                { label: 'User', value: 'User' },
                                { label: 'Partner', value: 'Partner' },
                            ]}
                        />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block loading={isLoading}>
                        Create account
                    </Button>
                </Form>

                <div style={{ marginTop: 12, fontSize: 13 }}>
                    <Typography.Text type="secondary">Already have an account?</Typography.Text>{' '}
                    <Link to="/signin">Sign in</Link>
                </div>
            </Card>
        </div>
    )
}

export default SignUp

