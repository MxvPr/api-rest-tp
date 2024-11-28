"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("./entities/restaurant.entity");
let RestaurantsService = class RestaurantsService {
    constructor(restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }
    async create(createRestaurantDto) {
        const newRestaurant = this.restaurantRepository.create(createRestaurantDto);
        return await this.restaurantRepository.save(newRestaurant);
    }
    async findAll() {
        return await this.restaurantRepository.find();
    }
    async findOne(id) {
        const restaurant = await this.restaurantRepository.findOneBy({ id });
        if (!restaurant) {
            throw new common_1.NotFoundException(`Restaurant avec l'ID ${id} non trouvé.`);
        }
        return restaurant;
    }
    async update(id, updateRestaurantDto) {
        const restaurant = await this.findOne(id);
        const updatedRestaurant = { ...restaurant, ...updateRestaurantDto };
        await this.restaurantRepository.update(id, updatedRestaurant);
        return this.restaurantRepository.findOneBy({ id });
    }
    async remove(id) {
        const restaurant = await this.findOne(id);
        await this.restaurantRepository.remove(restaurant);
    }
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RestaurantsService);
//# sourceMappingURL=restaurants.service.js.map