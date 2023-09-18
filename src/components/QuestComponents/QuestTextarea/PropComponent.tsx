/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-16 10:42:14
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-17 20:36:22
 */
import { Form, Input } from "antd";
import { FC, useEffect } from "react";
import { QuestionTextAreaPropsType } from "./type";

/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-16 10:42:14
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-16 12:06:39
 */
export const PropComponent: FC<QuestionTextAreaPropsType> = (
  props: QuestionTextAreaPropsType
) => {
  const { title, placeholder, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);

  function handleChange() {
    if (onChange) {
      //将表单中的值全传到onChange中
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "必填" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};
