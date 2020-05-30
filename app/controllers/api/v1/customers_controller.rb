class Api::V1::CustomersController < ApplicationController

  # GET /customers
  def index
    @customers = Customer.all
    render json: @customers
  end

  # GET /customers/:id
  def show
    @customer = Customer.find(params[:id])
    render json: @customer
  end

  # POST /customers
  def create
    @customer = Customer.new(customer_params)
    if @customer.save
      render json: @customer
    else
      render error: { error: 'Unable to create Customer.' }, status: 400
    end
  end

  # PUT /customers/:id
  def update
    @customer = Customer.find(params[:id])
    if @customer
      @customer.update(customer_params)
      render json: { message: 'Customer successfully update.' }, status: 200
    else
      render json: { error: 'Unable to update Customer.' }, status: 400
    end
  end

  # DELETE /customers/:id
  def destroy
    @customer = Customer.find(params[:id])
    if @customer
      @customer.destroy
      render json: { message: 'Customer successfully deleted.' }, status: 200
    else
      render json: { error: 'Unable to delete Customer.' }, status: 400
    end
  end

  private

  def customer_params
    params.require(:customer).permit(:name)
  end
end
