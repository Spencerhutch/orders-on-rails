class Api::V1::ProductsController < ApplicationController
  before_action :find_product, only: [:show, :update, :destroy]

  # GET /products
  def index
    if params[:search]
      @products = Product.where('lower(name) LIKE ?', "#{params[:search].downcase}%").limit(3)
      render json: @products
    else
      @products = Product.all
      render json: @products
    end
  end

  # GET /products/:id
  def show
    render json: @product
  end

  # POST /products
  def create
    @product = Product.new(product_params)
    if @product.save
      render json: @product
    else
      render error: { error: 'Unable to create Product.' }, status: 400
    end
  end

  # PUT /products/:id
  def update
    if @product
      @product.update(product_params)
      render json: { message: 'Product successfully update.' }, status: 200
    else
      render json: { error: 'Unable to update Product.' }, status: 400
    end
  end


  # DELETE /products/:id
  def destroy
    if @product
      @product.destroy
      render json: { message: 'Product successfully deleted.' }, status: 200
    else
      render json: { error: 'Unable to delete Product.' }, status: 400
    end
  end

  private

  def product_params
    params.require(:product).permit(:name, :cost)
  end

  def find_product
    @product = Product.find(params[:id])
  end



end
