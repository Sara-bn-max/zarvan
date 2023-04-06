import React, { Children } from 'react'

export default function CustomForm({handleSubmit,submitText}) {
  return (
    <Form onSubmit={handleSubmit}>
      <div className="w-100">
        <div className="row">
          <div className="col-12">
            {Children}
          </div>
          <div className="col-12 text-left">
            <Button className="bg-primary" type="submit">
              {submitText}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  )
}
