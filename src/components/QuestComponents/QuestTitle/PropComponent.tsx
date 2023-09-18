import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Form, Input, Select, Switch } from "antd";
import { FC, useEffect } from "react";
import { QuestTitlePropsType } from "./type";

export const PropComponent: FC<QuestTitlePropsType> = (
  props: QuestTitlePropsType
) => {
  const { text, level, center, onChange, disabled } = props;
  const [form] = Form.useForm();

  function handleChange() {
    if (onChange) {
      //将表单中的值全传到onChange中
      onChange(form.getFieldsValue());
    }
  }
  useEffect(() => {
    form.setFieldsValue({ text, level, center });
  }, [text, level, center]);
  return (
    <Form
      layout="vertical"
      initialValues={{ text, level, center }}
      form={form}
      onValuesChange={handleChange}
      disabled={disabled}
    >
      {" "}
      <Form.Item
        label="标题名内容"
        name="text"
        rules={[{ required: true, message: "必填" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="等级"
        name="level"
        rules={[{ required: true, message: "必填" }]}
      >
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
            { value: 4, text: 4 },
            { value: 5, text: 5 },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item label="是否居中" name="center" valuePropName="checked">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
    </Form>
  );
};
