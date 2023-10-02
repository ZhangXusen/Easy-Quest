import {
  CheckOutlined,
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { nanoid } from "@reduxjs/toolkit";
import { Button, Form, Input, Select, Space, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import { FC, useEffect } from "react";
import { QuestRadioPropsType } from "./type";

export const PropComponent: FC<QuestRadioPropsType> = (
  props: QuestRadioPropsType
) => {
  const { disabled, onChange, title, options = [], vertical, value } = props;
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({ title, vertical, value, options });
  }, [title, vertical, value, options]);

  function handleChange() {
    if (onChange) {
      //将表单中的值全传到onChange中
      const newValues = form.getFieldsValue() as QuestRadioPropsType;
      if (newValues.options) {
        // 需要清除 text undefined 的选项
        newValues.options = newValues.options.filter(
          (opt) => !(opt.text == null)
        );
      }
      //给新添加的选项的value赋值
      const { options = [] } = newValues;
      options.map((opt) => {
        if (opt.value) return;
        opt.value = nanoid(5); //补齐value
      });
      onChange(newValues);
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, vertical, value, options }}
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
        <Form.List name="options">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((item, idx) => {
                  const { key, name } = item;
                  return (
                    <Space key={key} align="baseline">
                      <Form.Item
                        name={[name, "text"]}
                        rules={[
                          { required: true, message: "请输入选项文字" },
                          {
                            validator(_, text) {
                              const { options = [] } = form.getFieldsValue();

                              let num = 0;
                              options.forEach((opt: any) => {
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
                      {idx > 1 && (
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(name);
                          }}
                        />
                      )}
                    </Space>
                  );
                })}
                <Form.Item>
                  <Button
                    type="link"
                    onClick={() => add({ text: "", value: "" })}
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
      <Form.Item label="默认选中" name="value">
        <Select
          options={options.map(({ text, value }) => {
            return {
              value,
              label: text || "",
            };
          })}
          value={value}
        ></Select>
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
