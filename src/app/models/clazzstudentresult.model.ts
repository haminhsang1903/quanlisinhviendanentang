import { Students} from './students.model';
import { Results} from './results.model';
import { Attends} from './attends.model';
export class CLazzStudentResult{
    public student: Students;
    public result: Results[];
    public attend: Attends[];
}