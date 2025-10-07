/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
  Validate, // Importar Validate para usar el custom validator
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  IsOptional, // Para campos opcionales
} from 'class-validator';

// --------------------------------------------------------------------------
// 1. Custom Validator para comparar contraseñas
// --------------------------------------------------------------------------

@ValidatorConstraint({ name: 'IsMatchingPasswords', async: false })
export class IsMatchingPasswordsConstraint implements ValidatorConstraintInterface {
  validate(passwordConfirmation: any, args: ValidationArguments) {
    // args.object es el objeto CreateUserDto completo
    // args.property es 'confirm_password'
    // Se compara el valor de 'confirm_password' con el valor de 'password'
    const password = (args.object as CreateUserDto).password;
    return passwordConfirmation === password;
  }

  defaultMessage(args: ValidationArguments) {
    return 'La confirmación de la contraseña no coincide con la contraseña.';
  }
}

// --------------------------------------------------------------------------
// 2. DTO principal
// --------------------------------------------------------------------------

export class CreateUserDto {
  /**
   * El nombre del usuario.
   * @example "Juan Pérez"
   */
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo o alias del usuario.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(80, { message: 'El nombre no puede exceder los 80 caracteres.' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  /**
   * El correo electrónico del usuario.
   * @example "juan.perez@email.com"
   */
  @ApiProperty({ example: 'juan.perez@email.com', description: 'Dirección de correo única para el registro.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsEmail({}, { message: 'Debe ser un formato de correo electrónico válido.' })
  email!: string;

  /**
   * El nombre de usuario (username).
   * @example "juanperez123"
   */
  @ApiProperty({ example: 'juanperez123', description: 'Nombre de usuario único para el login.' })
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio.' })
  @IsString()
  @MinLength(4, { message: 'El nombre de usuario debe tener al menos 4 caracteres.' })
  @MaxLength(20, { message: 'El nombre de usuario no puede exceder los 20 caracteres.' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'El nombre de usuario solo puede contener letras, números y guiones bajos (_).',
  })
  username!: string;

  /**
   * La contraseña del usuario.
   * @example "Password1@"
   */
  @ApiProperty({ example: 'Password1@', description: 'Contraseña para la cuenta.' })
  @IsNotEmpty()
  @IsString()
  @Length(8, 15, {
    message: 'La contraseña debe tener entre 8 y 15 caracteres.',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe incluir al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password!: string;

  /**
   * La confirmación de la contraseña.
   * Debe coincidir con el campo 'password'.
   * @example "Password1@"
   */
  @ApiProperty({ example: 'Password1@', description: 'Repetir la contraseña para confirmación.' })
  @IsNotEmpty({ message: 'La confirmación de la contraseña es obligatoria.' })
  @IsString()
  @Validate(IsMatchingPasswordsConstraint) // 👇 APLICAMOS EL VALIDADOR PERSONALIZADO
  confirm_password!: string;

  /**
   * Texto que describe la zona o ubicación del usuario. (Opcional)
   * @example "Córdoba Capital, Barrio Centro"
   */
  @ApiProperty({ example: 'Córdoba Capital, Barrio Centro', required: false, description: 'Texto que indica la zona o ubicación del usuario.' })
  @IsOptional() // 👇 Marcar como opcional
  @IsString()
  @MaxLength(150, { message: 'La zona no puede exceder los 150 caracteres.' })
  zone_text?: string;

  /**
   * Constructor para asignar valores parciales al DTO.
   * @param partial Objeto parcial de tipo CreateUserDto.
   */
  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}