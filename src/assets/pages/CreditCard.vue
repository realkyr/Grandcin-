<template>
  <div class="CCBackground">
    <div class="outercontainer">
      <div class="card-wrapper"></div>
      <div class="formcontainer">
        <form action="">
          <img height="120px" src="../pics/logo.png" />
          <input
            class="form-control"
            placeholder="Card Number"
            type="text"
            name="number"
          />
          <br />
          <input
            class="form-control"
            placeholder="Full Name"
            type="text"
            name="name"
          />
          <br />
          <div class="form-inline text-right">
            <div class="form-group">
              <input
                class="form-control"
                placeholder="MM/YY"
                type="text"
                name="expiry"
              />
              <input
                class="form-control"
                placeholder="CVC"
                type="text"
                name="cvc"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="text-right purchasebtn">
        <b-button
          @click="alert()"
          variant="primary mx-auto d-block"
          to="/success"
        >
          Purchase
        </b-button>
      </div>
    </div>
  </div>
</template>

<style>
html {
  background: #fff;
}

.CCBackground {
  padding-top: 50px;
  height: 100%;
  background: #fff;
}

.outercontainer {
  margin: 0px auto;
  border: 1px solid #a6a6a6;
  padding: 20px;
  border-radius: 3px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  width: 500px;
  background: #607d8b;
}

.formcontainer {
  margin-top: 20px;
}

.purchasebtn {
  margin-top: 20px;
}

.btn-success {
  background-color: #0032a0;
}
</style>
