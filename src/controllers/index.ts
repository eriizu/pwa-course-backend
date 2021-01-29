import { TimerController } from "./Timer/Timer";
import { PushController } from "./Push/Push";

const timerController = new TimerController();
const pushController = new PushController();

export { timerController, pushController };
