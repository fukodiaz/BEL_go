<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if(!Schema::hasTable('real_estate')){
            Schema::create('real_estate', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('city_id');
                $table->foreign('city_id')->references('id')->on('cities');
                $table->string('imageIntro');
                $table->string('imageDetails');
                $table->decimal('price');
                $table->unsignedBigInteger('conception_id');
                $table->foreign('conception_id')->references('id')->on('conceptions');
                $table->string('descriptionShort');
                $table->text('information');
                $table->unsignedBigInteger('address_id');
                $table->foreign('address_id')->references('id')->on('addresses');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('real_estate');
    }
};
