import Form from 'react-bootstrap/Form';

const DoubleOptionCheckbox  = ({ SelectOption1, SelectOption2, handleSelectionChange }) => {
  return (
    <Form>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label={ SelectOption1}
            name="group1"
            type={type}
            id={`inline-${type}-1`}
            onClick={() => {handleSelectionChange(SelectOption1)}}
          />
          <Form.Check
            inline
            label={ SelectOption2}
            name="group1"
            type={type}
            id={`inline-${type}-2`}
            onClick={() => {handleSelectionChange(SelectOption2)}}
          />
        </div>
      ))}
    </Form>
  );
}

export default DoubleOptionCheckbox;