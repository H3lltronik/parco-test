import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckInInput, CheckInOutput } from './dto/check-in';
import { CreateParkingInput } from './dto/create-parking';
import { FindAllArgs, FoundAllParkingOutput } from './dto/find-all';
import { UpdateParkingInput } from './dto/update-parking';
import { Parking } from './entities/parking.entity';
import { ParkingService } from './parking.service';

@Resolver(() => Parking)
export class ParkingResolver {
  constructor(private readonly parkingService: ParkingService) {}

  @Mutation(() => Parking)
  createParking(
    @Args('createParkingInput') createParkingInput: CreateParkingInput,
  ) {
    return this.parkingService.create(createParkingInput);
  }

  @Query(() => FoundAllParkingOutput, { name: 'parkings' })
  async findAll(
    @Args() findAllArgs: FindAllArgs,
  ): Promise<FoundAllParkingOutput> {
    return await this.parkingService.findAll(findAllArgs);
  }

  @Query(() => Parking, { name: 'parking' })
  findOne(@Args('id', { type: () => Int, nullable: true }) id: number) {
    return this.parkingService.findOne(id);
  }

  @Mutation(() => Parking)
  async updateParking(
    @Args('updateParkingInput') updateParkingInput: UpdateParkingInput,
  ) {
    return await this.parkingService.update(
      updateParkingInput.id,
      updateParkingInput,
    );
  }

  @Mutation(() => CheckInOutput)
  async checkIn(@Args('checkInInput') checkInInput: CheckInInput) {
    const result = await this.parkingService.checkIn(checkInInput);
    return result;
  }

  @Mutation(() => Parking)
  removeParking(@Args('id', { type: () => Int }) id: number) {
    return this.parkingService.remove(id);
  }
}
