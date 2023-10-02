import {
  CheckOutlined,
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { nanoid } from "@reduxjs/toolkit";
import { Button, Checkbox, Form, Input, Space, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import { FC, useEffect } from "react";
import { QuestCheckboxPropsType } from "./type";

export const PropComponent: FC<QuestCheckboxPropsType> = (
  props: QuestCheckboxPropsType
) => {
  const { disabled, onChange, title, list = [], vertical } = props;
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({ title, vertical, list });
  }, [title, vertical, list]);
  function handleChange() {
    if (onChange) {
      const newValues = form.getFieldsValue() as QuestCheckboxPropsType;
      if (newValues.list) {
        // 需要清除 text undefined 的选项
        newValues.list = newValues.list.filter((opt) => !(opt.text == null));
      }
      //给新添加的选项的value赋值
      const { list = [] } = newValues;
      list.map((opt) => {
        if (opt.value) return;
        opt.value = nanoid(5); //补齐value
      });
      onChange(newValues);
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, vertical, list }}
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

      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((item, idx) => {
                  const { key, name } = item;
                  return (
                    <Space key={key} align="baseline">
                      <Form.Item
                        name={[name, "checked"]}
                        valuePropName="checked"
                      >
                        <Checkbox></Checkbox>
                      </Form.Item>
                      <Form.Item
                        name={[name, "text"]}
                        rules={[
                          { required: true, message: "请输入选项文字" },
                          {
                            validator(_, text) {
                              const { list = [] } = form.getFieldsValue();

                              let num = 0;
                              list.forEach((opt: any) => {
                                if (opt.text === text) {
                                  num++;
                                }
                              });
                              if (num === 1) return Promise.resolve();
                              return Promise.reject(
                                new Error("与其他选项重复！")
                              );
                            },
                          },
                        ]}
                      >
                        <Input placeholder="输入选项文字..."></Input>
                      </Form.Item>
                      {
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(name);
                          }}
                        />
                      }
                    </Space>
                  );
                })}
                <Form.Item>
                  <Button
                    type="link"
                    onClick={() => add({ text: "", value: "", checked: false })}
                    icon={<PlusOutlined />}
                  >
                    添加选项
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Form.Item>
      <Form.Item label="是否垂直" name="vertical" valuePropName="checked">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
    </Form>
  );
};
