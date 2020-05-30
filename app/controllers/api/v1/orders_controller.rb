class Api::V1::OrdersController < ApplicationController
  before_action :find_order, only: [:show, :update, :destroy, :submit, :cancel]

  # GET /orders
  def index
    @orders = Order.all
    render json: @orders.to_json(
      :include => [
        :customer => { :only => [:id, :name]},
        :products => { :only => [:id, :name]}
      ]
    )
  end

  # GET /orders/:id
  def show
    render json: @order.as_json(include: [:customer, :products])
  end

  # POST /orders
  def create
    @order = Order.new(order_params)
    products = params[:products]
    products.each do |product_id|
      if product_id != ''
        product_id = product_id.to_i
        product_to_add = Product.find_by_id(product_id)
        @order.products << product_to_add
      end
    end
    calculate_costs(@order)
    @order.state = 'DRAFT'
    if @order.save
      render json: @order
    else
      render error: { error: 'Unable to create Order.' }, status: 400
    end
  end

  # PUT /orders/:id
  def update
    if @order
      @order.update(order_params)
      update_order_products(@order, params)
      calculate_costs(@order)
      @order.save
      render json: @order.to_json(
        :include => [
          :customer => { :only => [:id, :name]},
          :products => { :only => [:id, :name]}
        ]
      )
    else
      render json: { error: 'Unable to update Order.' }, status: 400
    end
  end

  # PUT /orders/:id/submit
  def submit
    if @order
      @order.update(state: 'SUBMITTED')
      render json: { message: 'Order successfully submitted'}, status: 200
    else
      render json: { error: 'Unable to submit order'}, status: 400
    end
  end

  # PUT /orders/:id/cancel
  def cancel
    if @order
      @order.update(state: 'CANCELLED')
      render json: { message: 'Order successfully cancelled'}, status: 200
    else
      render json: { error: 'Unable to cancel order'}, status: 400
    end
  end

  # DELETE /orders/:id
  def destroy
    if @order
      @order.destroy
      render json: { message: 'Order successfully deleted.' }, status: 200
    else
      render json: { error: 'Unable to delete Order.' }, status: 400
    end
  end

  private

  def update_order_products(order, params)
    order.product_ids = params[:order][:products]
    order.save
  end

  def calculate_costs(order)
    subtotal = 0
    order.products.each do |product|
      puts product.inspect
      subtotal = subtotal + product.cost
    end
    @order.subtotal = subtotal
    @order.tax = 0.079 * 100
    @order.total = subtotal * 1.079
  end

  def order_params
    params.require(:order).permit(:customer_id, :products)
  end

  def find_order
    @order = Order.find(params[:id])
  end

end
