import React from "react";

const Checkout = () => {
  return (
    <div>
      <div class="ui left action input">
        <button class="ui teal labeled icon button">
          <i class="cart icon"></i>
          Checkout
        </button>
        <input type="text" readOnly="" value="$52.03" />
      </div>
    </div>
  );
};

export default Checkout;
