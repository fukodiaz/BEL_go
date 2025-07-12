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
        if(!Schema::hasTable('conceptions')){
            Schema::create('conceptions', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('classification_id');
                $table->foreign('classification_id')->references('id')->on('classifications');
                $table->string('label');
                $table->string('slug');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conceptions');
    }
};
