import React, { useState } from "react";
import { Form, Input, message, Modal, Select } from "antd";
import Spinner from "./Spinner";
import axios from "axios";

function AddEditTransaction({
  setShowAddEditTransactionModal,
  showAddEditTransactionModal,
  selectedItemForEdit,
  setSelectedItemForEdit,
  getTransactions,
}) {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("sheymoney-udemy-user"));
      setLoading(true);
      if (selectedItemForEdit) {
        await axios.post("/api/transactions/edit-transaction", {
           payload : {
            ...values,
            userid: user._id,
           },
          transactionId: selectedItemForEdit._id,
        });
        getTransactions();
        message.success("Transação atualizada com sucesso");
      } else {
        await axios.post("/api/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        getTransactions();
        message.success("Transação adicionada com sucesso");
      }
      setShowAddEditTransactionModal(false);
      setSelectedItemForEdit(null);
      setLoading(false);
    } catch (error) {
      message.error("Algo deu errado");
      setLoading(false);
    }
  };
  return (
    <Modal
      title={selectedItemForEdit ? "Editar transação" : "Add Transação"}
      visible={showAddEditTransactionModal}
      onCancel={() => setShowAddEditTransactionModal(false)}
      footer={false}
    >
      {loading && <Spinner />}
      <Form
        layout="vertical"
        className="transaction-form"
        onFinish={onFinish}
        initialValues={selectedItemForEdit}
      >
        <Form.Item label="Quantidade" name="amount">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Tipo" name="type">
          <Select>
            <Select.Option value="income">Renda</Select.Option>
            <Select.Option value="expence">Despesa</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Categoria" name="category">
          <Select>
            {" "}
            <Select.Option value="salary">Salário</Select.Option>
            <Select.Option value="freelance">Freelancer</Select.Option>
            <Select.Option value="food">Comida</Select.Option>
            <Select.Option value="entertainment">Entretenimento</Select.Option>
            <Select.Option value="investment">Investimento</Select.Option>
            <Select.Option value="travel">Viajem</Select.Option>
            <Select.Option value="education">Educação</Select.Option>
            <Select.Option value="medical">Remédios</Select.Option>
            <Select.Option value="tax">Impostos</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Data" name="date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Referência" name="reference">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Descrição" name="description">
          <Input type="text" />
        </Form.Item>

        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            Salvar
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditTransaction;
