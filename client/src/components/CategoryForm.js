import React from 'react';

const CategoryForm = props => {
  return (
    <form
      className="p-4 pb-5 h-20"
      action="/gallery"
      encType="application/json"
    >
      <div className="form-group d-flex flex-column col-9  col-sm-12 popup__text ">
        <label htmlFor="categoryForm" className="w-100">
          Pridať kategóriu
        </label>
        <input
          type="text"
          onChange={props.onChange}
          className="form-control text-uppercase popup__input"
          id="CategoryControlInput1"
          placeholder="Zadajte názov kategórie"
        />
      </div>
      <hr className="horizontal-line-form" />
    </form>
  );
};

export default CategoryForm;
