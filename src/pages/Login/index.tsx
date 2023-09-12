import { loginService } from "@/service/user";
import { setToken } from "@/utils/userToken";
import { UserAddOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Checkbox, Form, Input, Space, message } from "antd";
import Title from "antd/es/typography/Title";
import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export const Login: FC = () => {
  function rememberUser(values: any) {
    localStorage.setItem("USERNAME", values.username);
    localStorage.setItem("PASSWORD", values.password);
  }
  function forgetUser() {
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("PASSWORD");
  }
  function getUser() {
    const username = localStorage.getItem("USERNAME");
    const password = localStorage.getItem("PASSWORD");
    return {
      username,
      password,
    };
  }
  const [form] = Form.useForm();
  const navigator = useNavigate();
  useEffect(() => {
    const { username, password } = getUser();
    form.setFieldsValue({ username, password });
    return () => {};
  }, []);

  const { run } = useRequest(
    async (username, password) => {
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess: (res) => {
        const { token } = res.data.data;
        message.success("登录成功!");
        setToken(token);
        navigator("/manage/list");
      },
    }
  );
  function onFinish(values: any) {
    const { username, password, remember } = values ?? {};

    if (remember) {
      rememberUser(values);
      run(username, password);
    } else {
      console.log("111");
      forgetUser();
    }
  }

  function onFinishFailed(errorInfo: any) {}

  return (
    <div className="h-login flex flex-col items-center justify-center bg-white">
      <div className="top">
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div className="content">
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "请输入用户名" },
              {
                type: "string",
                min: 5,
                max: 20,
                message: "字符长度在 5-20 之间",
              },
              { pattern: /^\w+$/, message: "只能是字母数字下划线" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={"/register"}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
