import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParkingService } from './parking.service';
import { Parking } from './entities/parking.entity';
import { CreateParkingInput } from './dto/create-parking.input';
import { UpdateParkingInput } from './dto/update-parking.input';
import { FindAllArgs } from './dto/find-all-parking.input';
import { FoundAllParkingOutput } from './dto/found-all-parking.output';

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

  @Mutation(() => Parking)
  removeParking(@Args('id', { type: () => Int }) id: number) {
    return this.parkingService.remove(id);
  }
}
